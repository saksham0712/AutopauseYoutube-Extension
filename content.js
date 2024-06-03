console.log("Content script loaded");
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log("Content script received message:", message);
  if (message.command === "togglePlayback") {
    console.log("Toggling playback");
    var video = document.querySelector("video");
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
});
