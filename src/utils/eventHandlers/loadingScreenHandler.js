const loaderScreenEl = document.querySelector('.loading-screen');
const loaderEl = document.querySelector('.loader');
const loaderFillEl = document.querySelector('.loader-fill');
const startButtonEl = document.querySelector('#start-button');
const btnContainer = document.querySelector('.btn-container');
const turnOnSoundButtonEl = document.querySelector('#sound-on');
const turnOffSoundButtonEl = document.querySelector('#sound-off');

turnOffSoundButtonEl.addEventListener('click', () => {
  turnOffSoundButtonEl.style.display = 'none';
  turnOnSoundButtonEl.style.display = 'inline-block';
});
turnOnSoundButtonEl.addEventListener('click', () => {
  turnOnSoundButtonEl.style.display = 'none';
  turnOffSoundButtonEl.style.display = 'inline-block';
});

export {
  loaderScreenEl,
  loaderEl,
  loaderFillEl,
  startButtonEl,
  turnOnSoundButtonEl,
  turnOffSoundButtonEl,
  btnContainer,
};
