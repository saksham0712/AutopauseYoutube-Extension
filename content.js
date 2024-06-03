function pauseVideo() {
  const video = document.querySelector("video");
  if (video) video.pause();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "pauseVideo") {
    pauseVideo();
  }
});
