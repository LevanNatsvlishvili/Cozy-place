export const actionTurnOnSoundButtonEl =
  document.querySelector('#action-sound-on');
export const actionTurnOffSoundButtonEl =
  document.querySelector('#action-sound-off');
export const actionSoundButtonEl = document.querySelector('#action-sound');

export const actionBulbButtonEl = document.querySelector('#action-bulb');

export const actionTvButtonEl = document.querySelector('#action-tv');

export const actionFireplaceButtonEl =
  document.querySelector('#action-fireplace');

export const actionCandleButtonEl = document.querySelector('#action-candle');

const handleAction = (buttonEl) => {
  const isTurnedOff = buttonEl.classList.contains('off');
  if (isTurnedOff) {
    buttonEl.classList.remove('off');
    return;
  }
  buttonEl.classList.add('off');
};

export const handleBulb = () => handleAction(actionBulbButtonEl);
export const handleTv = () => handleAction(actionTvButtonEl);
export const handleFireplace = () => handleAction(actionFireplaceButtonEl);
export const handleCandle = () => handleAction(actionCandleButtonEl);

function addActionListeners(actions) {
  actionSoundButtonEl.addEventListener('click', () => {
    const isTurnedOff = actionSoundButtonEl.classList.contains('off');
    if (isTurnedOff) {
      actionSoundButtonEl.classList.remove('off');
      actionTurnOffSoundButtonEl.style.display = 'none';
      actionTurnOnSoundButtonEl.style.display = 'inline-block';
      actions.listener.setMasterVolume(1);
      return;
    }
    actionSoundButtonEl.classList.add('off');
    actionTurnOnSoundButtonEl.style.display = 'none';
    actionTurnOffSoundButtonEl.style.display = 'inline-block';
    actions.listener.setMasterVolume(0);
  });

  actionBulbButtonEl.addEventListener('click', () => {
    actions.bulb.toggleBulb(actions.bulb.ambientLight);
  });

  actionTvButtonEl.addEventListener('click', () => {
    actions.tv.toggleTV();
  });

  actionFireplaceButtonEl.addEventListener('click', () => {
    actions.hearth.toggleFire();
  });

  actionCandleButtonEl.addEventListener('click', () => {
    actions.table.toggleFire();
  });

  // if (actions.toggleBulb) {
  //   actionBulbButtonEl.addEventListener('click', () => {
  //     actions.toggleBulb(actions.ambientLight);
  //   });
  // }
}
export default addActionListeners;
