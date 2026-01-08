const applySpeed = (speed) => {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (video && video.playbackRate !== parseFloat(speed)) {
      video.playbackRate = parseFloat(speed);
    }
  });
};

chrome.storage.local.get(['videoSpeed'], (result) => {
  if (result.videoSpeed) applySpeed(result.videoSpeed);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.videoSpeed) applySpeed(changes.videoSpeed.newValue);
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    chrome.storage.local.get(['videoSpeed'], (result) => {
      if (result.videoSpeed) applySpeed(result.videoSpeed);
    });
  }
});

const observer = new MutationObserver(() => {
  chrome.storage.local.get(['videoSpeed'], (result) => {
    if (result.videoSpeed) applySpeed(result.videoSpeed);
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});