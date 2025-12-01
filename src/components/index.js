import hearth from '@/components/models/hearth';
import sofa from '@/components/models/sofa';
import table from '@/components/models/table';
import shelf from '@/components/models/shelf';
import windowFrame from '@/components/models/window';
import tvStation from '@/components/models/tvStation';
import cat from '@/components/models/cat';
import bulb from '@/components/models/bulb';
import preloadSounds from '@/components/sounds';

async function loadModels() {
  const hearthModel = await hearth(); // 1.9mb
  const catModel = await cat(); // 1.9mb
  const sofaModel = await sofa(); // 1.7mb
  const tableModel = await table(); // 2.3mb
  const shelfModel = await shelf(); // 3.4mb
  const windowModel = await windowFrame(); // 3mb
  const tvStationModel = await tvStation();
  const bulbModel = await bulb();
  // Sounds
  const soundData = await preloadSounds(); // 1.2mb

  return {
    hearthModel,
    catModel,
    sofaModel,
    tableModel,
    shelfModel,
    windowModel,
    tvStationModel,
    bulbModel,
    soundData,
  };
}

export default loadModels;
