import { mediaLength } from '@/utils/consts/common';

function startSounds(thunderSounds) {
  if (!thunderSounds) return;

  const { big, small, rain } = thunderSounds;

  rain.play();

  // small thunder
  setTimeout(() => {
    console.log('thunder 3 is played');
    // small.play();
  }, mediaLength.lightning.smallThunder);

  // big thunder
  setTimeout(() => {
    console.log('small thunder');
    // big.play();
  }, mediaLength.lightning.bigThunder);
}

export default startSounds;
