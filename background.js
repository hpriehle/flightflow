// Background script for Flight Flow Chrome Extension

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.google.com/travel/flights')) {
    // Enable the popup for Google Flights pages
    chrome.action.enable(tabId);
    // Change the icon to indicate it's ready (you'll need to create these icons)
    chrome.action.setIcon({
      path: {
        "16": "icon16-active.png",
        "48": "icon48-active.png",
        "128": "icon128-active.png"
      },
      tabId: tabId
    });
  } else {
    // Disable the popup for non-Google Flights pages
    chrome.action.disable(tabId);
    // Change the icon back to the default
    chrome.action.setIcon({
      path: {
        "16": "icon16.png",
        "48": "icon48.png",
        "128": "icon128.png"
      },
      tabId: tabId
    });
  }
});

// Listen for installation or update
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // First time installation
    chrome.tabs.create({url: "options.html"});
  } else if (details.reason === "update") {
    // Extension updated
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    if (currentVersion !== previousVersion) {
      // Notify user of update
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon128.png",
        title: "Flight Flow Updated",
        message: `Updated to version ${currentVersion}. Check options for any new features!`
      });
    }
  }
});