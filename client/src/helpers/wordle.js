import { REGIONS_POKEMON } from '../constants/constants';

export function getRegionFromPokemon(id) {
  return Object.values(REGIONS_POKEMON).reduce((region, { name, number, offset }) => {
    console.log(number, offset, name, id);
    if (id > offset && id <= number + offset) return name;
    return region;
  }, '');
}
