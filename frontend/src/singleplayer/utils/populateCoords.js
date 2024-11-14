export const populateCoords = (entity, size) => {
  const coords = [];

  // Upper and bottom edge
  for (
    let x = entity.x;
    x < entity.x + size;
    x++
  ) {
    coords.push([x, entity.y]);
    coords.push([x, entity.y + size]);
  }

  // Left and right edge
  for (
    let y = entity.y;
    y < entity.y + size;
    y++
  ) {
    coords.push([entity.x, y]);
    coords.push([entity.x + size, y]);
  }

  return coords;
};
