import loadingManager from './loadingManager';

export async function loadVideo(url, loop = true) {
  loadingManager.itemStart(url);

  const video = document.createElement('video');
  video.src = url;
  video.loop = loop;
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
