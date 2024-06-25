import { getPokemon } from '../api/pokemon';
import PokemonStore from '../store/pokemonStore';

import { transformPokemon } from './transformer';

export function getEvolutionChainTransformed(chain) {
  const evoChain = [];
  let evoData = chain;
  do {
    const numberOfEvolutions = evoData.evolves_to.length;

    evoChain.push({
      species_name: evoData.species.name,
      min_level: !evoData ? 1 : evoData.evolution_details[0]?.min_level,
      trigger_name: !evoData ? null : evoData.evolution_details[0]?.trigger.name,
      item: !evoData ? null : evoData.evolution_details[0]?.item,
    });

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i = i + 1) {
        evoChain.push({
          species_name: evoData.evolves_to[i].species.name,
          min_level: !evoData.evolves_to[i] ? 1 : evoData.evolves_to[i].evolution_details[0].min_level,
          trigger_name: !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details[0].trigger.name,
          item: !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details[0].item,
        });
      }
    }

    [evoData] = evoData.evolves_to;
  } while (!!evoData && Object.prototype.hasOwnProperty.call(evoData, 'evolves_to'));
  // evoData.hasOwnProperty('evolves_to'));

  return evoChain;
}

export async function findOrGetPokemonChain(evoChain) {
  const allPokemon = await PokemonStore.getAllPokemon();
  const evolutionPokemon = await Promise.all(evoChain.map(async evo => {
    const foundPokemon = allPokemon?.find(poke => {
      return poke.name.toLowerCase() === evo.species_name;
    });
    if (foundPokemon) return foundPokemon;
    const pokemonNotFound = await getPokemon(evo.species_name);
    const pokemonTransformed = transformPokemon(pokemonNotFound);
    return pokemonTransformed;
  }));
  return evolutionPokemon;
}

export default { getEvolutionChainTransformed, findOrGetPokemonChain };
