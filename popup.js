const slider = document.getElementById('speedSlider');
const input = document.getElementById('speedInput');
const resetBtn = document.getElementById('resetBtn');

function updateTrackColor(val) {
const min = parseFloat(slider.min) || 0.5;
  const max = parseFloat(slider.max) || 4.0;  
  const percentage = ((val - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, #DC143C ${percentage}%, #f1f5f9 ${percentage}%)`;
}

function setSpeed(value) {
  let speed = parseFloat(value);
  if (isNaN(speed)) return;
  if (speed < 0.5) speed = 0.5;
  if (speed > 4.0) speed = 4.0;

  slider.value = speed;
  input.value = speed.toFixed(1);
  updateTrackColor(speed);
  
  chrome.storage.local.set({ videoSpeed: speed });
}

slider.addEventListener('input', (e) => setSpeed(e.target.value));
input.addEventListener('change', (e) => setSpeed(e.target.value));

chrome.storage.local.get(['videoSpeed'], (result) => {
  const savedSpeed = result.videoSpeed || 1.0;
  setSpeed(savedSpeed);
});

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    setSpeed(1.0);
    console.log("Speed reset to 1.0x");
  });
}