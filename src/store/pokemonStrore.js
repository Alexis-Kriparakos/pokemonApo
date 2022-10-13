import { BehaviorSubject } from 'rxjs';
import has from 'lodash/has';

import { getData } from '../api/pokemon';

const pokemonStore$ = new BehaviorSubject({});
const pokemonFetched$ = new BehaviorSubject(false);

const PokemonFetched = {
  update: (fetched) => {
    pokemonFetched$.next(fetched);
  },
};

const PokemonStore = {
  update: (pokemon) => {
    pokemonStore$.next(pokemon);
    PokemonFetched.update(true);
  },
  onPokemonFetch: async (region) => {
    const pokemonCollection = PokemonStore.getValue();
    if (!has(pokemonCollection, `${region}`)) {
      return getData(region);
    }
    return pokemonCollection;
  },
  subscribe: (setPokemon) => pokemonStore$.subscribe(setPokemon),
  getValue: () => pokemonStore$.value,
  isFetched: () => pokemonFetched$.value,
};

export default PokemonStore;
