// Popup script for Flight Flow Chrome Extension

document.addEventListener('DOMContentLoaded', function() {
  const addFlightButton = document.getElementById('addFlight');
  const messageDiv = document.getElementById('message');
  const lastScrapedDiv = document.getElementById('lastScraped');

  // Check if we're on a valid Google Flights page
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentUrl = tabs[0].url;
    if (!currentUrl.startsWith('https://www.google.com/travel/flights')) {
      addFlightButton.disabled = true;
      messageDiv.textContent = 'Please navigate to a Google Flights page.';
      messageDiv.classList.add('text-red-500');
    }
  });

  // Add Flight button click handler
  addFlightButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "scrapeFlightData"}, function(response) {
        if (chrome.runtime.lastError) {
          messageDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
          messageDiv.classList.add('text-red-500');
        } else if (response && response.success) {
          messageDiv.textContent = 'Flight data scraped successfully!';
          messageDiv.classList.add('text-green-500');
          // Store the scraped data
          chrome.storage.local.set({lastScrapedFlight: response.data});
          displayLastScrapedFlight(response.data);
        } else {
          messageDiv.textContent = 'Failed to scrape flight data.';
          messageDiv.classList.add('text-red-500');
        }
      });
    });
  });

  // Display last scraped flight data
  chrome.storage.local.get('lastScrapedFlight', function(result) {
    if (result.lastScrapedFlight) {
      displayLastScrapedFlight(result.lastScrapedFlight);
    }
  });

  function displayLastScrapedFlight(flightData) {
    lastScrapedDiv.innerHTML = `
      <h3 class="font-bold">Last Scraped Flight:</h3>
      <p>From: ${flightData.departureAirport}</p>
      <p>To: ${flightData.arrivalAirport}</p>
      <p>Price: ${flightData.price}</p>
    `;
  }
});