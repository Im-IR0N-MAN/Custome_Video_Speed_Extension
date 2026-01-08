const slider = document.getElementById('speedSlider');
const input = document.getElementById('speedInput');

// Sync UI on open
chrome.storage.local.get(['videoSpeed'], (result) => {
  const speed = result.videoSpeed || 1.0;
  slider.value = speed;
  input.value = speed;
});

function setSpeed(value) {
  const speed = parseFloat(value);
  slider.value = speed;
  input.value = speed;
  
  // Save to storage - content.js will "hear" this change automatically
  chrome.storage.local.set({ videoSpeed: speed });
}

slider.addEventListener('input', (e) => setSpeed(e.target.value));
input.addEventListener('input', (e) => setSpeed(e.target.value));