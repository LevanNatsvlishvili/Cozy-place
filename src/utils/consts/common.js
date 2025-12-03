export const floorCoordinates = {
  width: 10,
  length: 12,
};
export const wallCoordinates = {
  width: floorCoordinates.length,
  height: 5.75,
};

export const sideWallCoordinates = {
  z: floorCoordinates.length / 2,
  x1: floorCoordinates.width / 2,
  x2: -floorCoordinates.width / 2,
  y: wallCoordinates.height / 2,
};

export const windowCoordinates = {
  width: floorCoordinates.width,
  height: 6,
  z: -0,
};

export const backWallCoordinates = {
  z: floorCoordinates.length,
  width: floorCoordinates.width,
  height: wallCoordinates.height,
};

export const colors = {
  light: '#ffd27f',
};

export const shadow = {
  mapSize: { width: 1024, height: 1024 },
};

export const mediaLength = {
  thunder: {
    bigThunder: 9000,
    smallThunder: 5000,
  },
  lightning: {
    length: 26000,
    pause: 60000,
    bigLightning: 9000,
    smallLightning: 5000,
  },
};

export const planeBounds = {
  minX: -3,
  maxX: 30,
  minZ: 3,
  maxZ: 30,
  minY: 0.2,
  maxY: 5.5,
};
