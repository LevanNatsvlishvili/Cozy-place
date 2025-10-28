export const floorCoordinates = {
  width: 7,
  length: 10,
};
export const wallCoordinates = {
  width: floorCoordinates.length,
  height: 4,
};

export const sideWallCoordinates = {
  z: floorCoordinates.length / 2,
  x1: floorCoordinates.width / 2,
  x2: -floorCoordinates.width / 2,
  y: wallCoordinates.height / 2,
};

export const windowCoordinates = {
  width: 7,
  height: 6,
  z: -0,
};
