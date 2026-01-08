const slider = document.getElementById('speedSlider');
const input = document.getElementById('speedInput');

chrome.storage.local.get(['videoSpeed'], (result) => {
  if (result.videoSpeed) {
    updateUI(result.videoSpeed);
  }
});

function updateUI(val) {
  slider.value = val;
  input.value = val;
}

function setSpeed(value) {
  const speed = parseFloat(value);
  updateUI(speed);
  
  chrome.storage.local.set({ videoSpeed: speed });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (s) => {
        const videos = document.querySelectorAll('video');
        videos.forEach(v => v.playbackRate = s);
      },
      args: [speed]
    });
  });
}

slider.addEventListener('input', (e) => setSpeed(e.target.value)); 
input.addEventListener('input', (e) => setSpeed(e.target.value));