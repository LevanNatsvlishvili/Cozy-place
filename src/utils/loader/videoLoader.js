import loadingManager from './loadingManager';

export async function loadVideo(url) {
  loadingManager.itemStart(url);

  const video = document.createElement('video');
  video.src = url;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;

  video.addEventListener(
    'loadeddata',
    () => {
      loadingManager.itemEnd(url);
    },
    { once: true }
  );

  video.addEventListener('error', () => {
    loadingManager.itemError(url);
    loadingManager.itemEnd(url);
  });

  return video;
}

export default loadVideo;
