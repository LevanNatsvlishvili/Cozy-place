import rain from './rain';
import thunder from './thunder';

async function preloadSounds() {
  let sounds = {};
  sounds = await thunder(); // just loads, no playback yet
  sounds.rain = await rain();
  return sounds;
}

export default preloadSounds;
