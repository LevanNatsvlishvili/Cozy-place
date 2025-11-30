import rain from './rain';
import thunder from './thunder';

async function preloadSounds() {
  let sounds = {};
  sounds = await thunder(); // just loads, no playback yet
  sounds.rain = await rain();
  console.log(sounds);
  return sounds;
}

export default preloadSounds;
