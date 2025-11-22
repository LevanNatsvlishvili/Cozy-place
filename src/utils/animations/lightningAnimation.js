import * as THREE from 'three';

function updateLightningFromVideo(light, ambientLight) {
  const video = light.userData.video;
  const canvas = light.userData.brightnessCanvas;
  const ctx = light.userData.brightnessCtx;

  if (!video || !ctx || video.readyState < 2) return;

  // Draw current video frame into tiny canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Compute average brightness
  let sum = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = (r + g + b) / 3; // simple luminance
    sum += lum;
  }

  const avg = sum / (data.length / 4); // 0–255
  const normalized = avg / 255; // 0–1

  // Map brightness → lightning intensity
  // tweak these to taste
  const minIntensity = 0.0; // almost dark room
  const maxIntensity = 8.0; // big flash
  const targetIntensity = THREE.MathUtils.lerp(minIntensity, maxIntensity, normalized);
  const intensityy = THREE.MathUtils.lerp(ambientLight.intensity, targetIntensity, 0.35);
  ambientLight.intensity = intensityy;
}

export default updateLightningFromVideo;
