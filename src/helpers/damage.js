import { TYPE_WEAKNESS_TABLE } from '../constants/constants';

export function calculateDamage(pokemonAttacking, pokemonDefending, move) {
  const stab = pokemonAttacking.types
    .some((types) => types.type.some((type) => type.name === move.type.name));
  console.log(stab);
}

export default { calculateDamage };
