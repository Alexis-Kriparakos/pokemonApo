import { BehaviorSubject } from 'rxjs';

import jsonStorage from '../helpers/json-storage';

const pokemonToShow$ = new BehaviorSubject({ region: '', pokemon: [] });

export const PokemonToShow = {
  update: pokemon => {
    pokemonToShow$.next(pokemon);
  },
  subscribe: setPokemon => pokemonToShow$.subscribe(setPokemon),
  getValue: () => pokemonToShow$.value,

};

export const PokemonSelected = {
  subject: undefined,
  lazyInit: () => {
    if (PokemonSelected.subject) return PokemonSelected.subject;
    const storage = window.localStorage;
    const pokemonSelected = jsonStorage.get('pokemonSelected', { storage }) || [];

    PokemonSelected.subject = new BehaviorSubject(pokemonSelected);
    return PokemonSelected.subject;
  },
  update: pokemonSelected => {
    const _pokemonSelected = PokemonSelected.lazyInit();
    _pokemonSelected.next(pokemonSelected);
    const storage = window.localStorage;
    jsonStorage.set('pokemonSelected', pokemonSelected, { storage });
  },
  subscribe: pokemonSelected => {
    const _pokemonSelected = PokemonSelected.lazyInit();
    return _pokemonSelected.subscribe(pokemonSelected);
  },
  getValue: () => {
    const _pokemonSelected = PokemonSelected.lazyInit();
    return _pokemonSelected.value;
  },
};
