import { TYPE_WEAKNESS_TABLE, MOVE_DIVISION } from '../constants/constants';

export function calculateDamage(pokemonAttacking, pokemonDefending, move) {
  const attackMissed = Math.floor(Math.random() * 100) + 1 > move?.accuracy;
  if (attackMissed) return 0;

  const stab = pokemonAttacking.types
    .some(type => type === move.type.name);
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
  console.log('damage', damage, baseDamage, moveType);
  return damage;
}

export default { calculateDamage };
