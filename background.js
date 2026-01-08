const ACCENT_COLOR = '#DC143C';
const BG_COLOR = '#FFFFFF';

function drawIcon(speedText) {
  const size = 32;
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, size, size);

  const radius = 8; 
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();

  ctx.fillStyle = BG_COLOR;
  ctx.fill();

  ctx.fillStyle = ACCENT_COLOR;
  ctx.font = 'bold 22px "Outfit", sans-serif'; 
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(speedText, size / 2, size / 2 + 1);

  return ctx.getImageData(0, 0, size, size);
}

function updateIcon(speed) {
  let speedVal = parseFloat(speed) || 1.0;
  const text = Number.isInteger(speedVal) ? speedVal.toString() : speedVal.toFixed(1);
  const imageData = drawIcon(text);
  chrome.action.setIcon({ imageData: imageData });
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.videoSpeed) updateIcon(changes.videoSpeed.newValue);
});

function init() {
  chrome.storage.local.get(['videoSpeed'], (result) => {
    updateIcon(result.videoSpeed || 1.0);
  });
}

chrome.runtime.onInstalled.addListener(init);
chrome.runtime.onStartup.addListener(init);