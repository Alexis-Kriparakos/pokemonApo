import { getPokemonMove } from '../api/pokemon';

export function getPokemonMoves(pokemon) {
  return Promise.all(pokemon.moves.map(async move => {
    const pokemonM = await getPokemonMove(move.move.url);
    return {
      id: pokemonM.id,
      name: pokemonM.name,
      effect_chance: pokemonM.effect_chance,
      effect_changes: pokemonM.effect_changes,
      effect_entries: pokemonM.effect_entries,
      flavor_text_entries: pokemonM.flavor_text_entries,
      accuracy: pokemonM.accuracy,
      power: pokemonM.power,
      stat_changes: pokemonM.stat_changes,
      target: pokemonM.target,
      type: pokemonM.type,
      priority: pokemonM.priority,
      pp: pokemonM.pp,
    };
  }));
}
