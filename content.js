const applySpeed = (speed) => {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (video) {
      video.playbackRate = parseFloat(speed);
    }
  });
};

// 1. Apply speed when page loads
chrome.storage.local.get(['videoSpeed'], (result) => {
  if (result.videoSpeed) {
    applySpeed(result.videoSpeed);
  }
});

// 2. LISTEN DIRECTLY TO STORAGE CHANGES
// This is much more reliable than messaging
chrome.storage.onChanged.addListener((changes) => {
  if (changes.videoSpeed) {
    applySpeed(changes.videoSpeed.newValue);
  }
});

// 3. Keep watching for new videos (YouTube/Netflix dynamic loading)
const observer = new MutationObserver(() => {
  chrome.storage.local.get(['videoSpeed'], (result) => {
    if (result.videoSpeed) applySpeed(result.videoSpeed);
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});