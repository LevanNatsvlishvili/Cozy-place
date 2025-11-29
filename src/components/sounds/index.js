import rain from './rain';
import thunder from './thunder';

const sounds = async () => {
  await rain();
  await thunder();
};

export default sounds;
