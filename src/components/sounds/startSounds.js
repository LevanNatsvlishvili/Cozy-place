import { mediaLength } from '@/utils/consts/common';

function startSounds(thunderSounds) {
  if (!thunderSounds) return;

  const { big, small, rain } = thunderSounds;
  const interval = mediaLength.lightning.length + mediaLength.lightning.pause;

  rain.play();
  // small thunder
  setTimeout(() => {
    console.log('small played');
    small.play();
  }, mediaLength.thunder.smallThunder);

  setInterval(() => {
    small.play();
  }, interval + mediaLength.thunder.smallThunder);

  // big thunder
  setTimeout(() => {
    console.log('big thunder');
    big.play();
  }, mediaLength.thunder.bigThunder);

  setInterval(() => {
    big.play();
  }, interval + mediaLength.thunder.bigThunder);

  setInterval;
}

export default startSounds;
