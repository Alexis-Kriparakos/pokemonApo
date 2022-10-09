import get from 'lodash/get';
import { TYPE_WEAKNESS_TABLE, MOVE_DIVISION } from '../constants/constants';

export function calculateDamage(pokemonAttacking, pokemonDefending, move) {
  const stab = pokemonAttacking.types
    .some((type) => type === move.type.name);
  const { type: { name: moveType } } = move;
  const type1 = TYPE_WEAKNESS_TABLE[moveType][pokemonDefending.types[0]];
  const type2 = TYPE_WEAKNESS_TABLE[moveType][pokemonDefending.types[1]] || 1;
  const isSpecial = MOVE_DIVISION.special.includes(moveType);
  const defTypeStat = isSpecial
    ? pokemonDefending.battleStats.spDefStat : pokemonDefending.battleStats.defStat;
  const atkTypeStat = isSpecial
    ? pokemonDefending.battleStats.spAtkStat : pokemonDefending.battleStats.atkStat;
  const baseDamage = (((2 * 100) / 5 + 2) * move.power
  * (atkTypeStat / defTypeStat)) / 50 + 2;
  const damage = Math.floor(baseDamage * (stab ? 1 : 0.5) * type1 * type2);
  return damage;
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
  const types = poke.types.map((type) => type.type.name);
  const newPoke = {
    ...poke,
    searchTerms: [`${poke.name}`, `${poke.name.toUpperCase()}`],
    battleStats: stats,
    stats,
    types,
  };
  return newPoke;
}

export default { calculateDamage };
