chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (!tab || !tab.url || !tab.url.includes("youtube.com/watch")) return;
    chrome.tabs.sendMessage(tab.id, { action: "checkPause" });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab && tab.url && tab.url.includes("youtube.com/watch")) {
    chrome.tabs.sendMessage(tabId, { action: "checkPause" });
  }
});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      if (!tabs || tabs.length === 0 || !tabs[0].url || !tabs[0].url.includes("youtube.com/watch")) return;
      chrome.tabs.sendMessage(tabs[0].id, { action: "pauseVideo" });
    });
  }
});