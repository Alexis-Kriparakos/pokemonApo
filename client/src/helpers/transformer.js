import get from 'lodash/get';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function transformPokemon(poke) {
  const hpStat = Math.ceil(get(poke, 'stats[0].base_stat') * 4.5);
  const atkStat = Math.ceil(get(poke, 'stats[1].base_stat') * 3.2);
  const defStat = Math.ceil(get(poke, 'stats[2].base_stat') * 3.2);
  const spAtkStat = Math.ceil(get(poke, 'stats[3].base_stat') * 3.2);
  const spDefStat = Math.ceil(get(poke, 'stats[4].base_stat') * 3.5);
  const speedStat = Math.ceil(get(poke, 'stats[5].base_stat') * 3);
  const stats = {
    hpStat, atkStat, defStat, spAtkStat, spDefStat, speedStat,
  };
  const types = poke?.types?.map(type => type.type.name);
  const newPoke = {
    ...poke,
    name: capitalizeFirstLetter(poke.name),
    searchTerms: [`${poke.name}`, `${poke.name.toUpperCase()}`],
    battleStats: { ...stats },
    isAlive: true,
    stats,
    types,
  };
  return newPoke;
}

export default { transformPokemon, capitalizeFirstLetter };
