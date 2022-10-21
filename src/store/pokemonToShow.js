import { BehaviorSubject } from 'rxjs';
import jsonStorage from '../helpers/json-storage';

const pokemonStore$ = new BehaviorSubject({ region: '', pokemon: [] });

const PokemonStore = {
  update: (pokemon) => {
    pokemonStore$.next(pokemon);
  },
  subscribe: (setPokemon) => pokemonStore$.subscribe(setPokemon),
  getValue: () => pokemonStore$.value,
};

const PokemonSeleccted = {
  subject: undefined,
  init: () => {
    if (PokemonSeleccted.subject) return PokemonSeleccted.subject;
    const storage = window.localStorage;
    jsonStorage.get('PokemmonSelected', { storage });
  },
};

export default { PokemonStore, PokemonSeleccted };
