const loaderScreenEl = document.querySelector('.loading-screen');
const loaderEl = document.querySelector('.loader');
const loaderFillEl = document.querySelector('.loader-fill');
const startButtonEl = document.querySelector('#start-button');

function onStartClick({ startSounds, startScene, animateTick }) {
  return startButtonEl.addEventListener('click', () => {
    // start scene
    startScene();
    animateTick();
    // start background sounds
    startSounds();
    loaderScreenEl.style.display = 'none';
  });
}

export { loaderScreenEl, loaderEl, loaderFillEl, startButtonEl, onStartClick };
