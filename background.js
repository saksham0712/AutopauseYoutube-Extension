// Track whether the message has been sent to avoid repeated sending
var messageSent = {};

chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
  if (details.url && details.url.includes("youtube.com") && !messageSent[details.tabId]) {
    sendMessageToContentScript(details.tabId);
  }
});

function sendMessageToContentScript(tabId) {
  chrome.tabs.sendMessage(tabId, { command: "togglePlayback" }, function(response) {
    if (chrome.runtime.lastError) {
      console.error("Error sending message:", chrome.runtime.lastError.message);
      // Retry sending the message after a short delay
      setTimeout(function() {
        sendMessageToContentScript(tabId);
      }, 1000); // Adjust the delay as needed
    } else {
      messageSent[tabId] = true; // Mark the message as sent
    }
  });
}
