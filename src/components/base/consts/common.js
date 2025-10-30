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
