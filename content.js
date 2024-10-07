// Content script for Flight Flow Chrome Extension

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeFlightData") {
    const flightData = scrapeFlightDetails();
    if (flightData) {
      sendDataToWebhook(flightData);
      sendResponse({success: true, data: flightData});
    } else {
      sendResponse({success: false});
    }
  }
  return true; // Indicates that the response will be sent asynchronously
});

function scrapeFlightDetails() {
  try {
    // Selectors for flight details (these may need to be updated based on Google Flights' structure)
    const priceElement = document.querySelector('[data-test-id="price-text"]');
    const routeElements = document.querySelectorAll('[data-test-id="airport-code"]');
    const dateTimeElements = document.querySelectorAll('[data-test-id="date-time"]');
    const airlineElements = document.querySelectorAll('[data-test-id="airline-name"]');
    const flightNumberElements = document.querySelectorAll('[data-test-id="flight-number"]');

    if (!priceElement || routeElements.length < 2 || dateTimeElements.length < 2) {
      console.error('Unable to find all required elements');
      return null;
    }

    const flightData = {
      price: priceElement.textContent.trim(),
      departureAirport: routeElements[0].textContent.trim(),
      arrivalAirport: routeElements[routeElements.length - 1].textContent.trim(),
      departureDateTime: dateTimeElements[0].textContent.trim(),
      arrivalDateTime: dateTimeElements[dateTimeElements.length - 1].textContent.trim(),
      airlines: Array.from(airlineElements).map(el => el.textContent.trim()),
      flightNumbers: Array.from(flightNumberElements).map(el => el.textContent.trim())
    };

    return flightData;
  } catch (error) {
    console.error('Error scraping flight details:', error);
    return null;
  }
}

function sendDataToWebhook(data) {
  chrome.storage.sync.get('webhookUrl', function(result) {
    if (result.webhookUrl) {
      fetch(result.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => console.log('Webhook response:', data))
      .catch((error) => console.error('Error:', error));
    } else {
      console.log('Webhook URL not set');
    }
  });
}