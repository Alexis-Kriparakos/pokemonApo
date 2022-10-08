import { BehaviorSubject } from 'rxjs';
import { Trainer1Team, Trainer2Team } from './teamStore';

const pokemonBattle$ = new BehaviorSubject({});
const pokemonFighting1$ = new BehaviorSubject({});
const pokemonFighting2$ = new BehaviorSubject({});

const isBattle$ = new BehaviorSubject(false);
const isTrainer1Turn$ = new BehaviorSubject(true);

export const IsBattle = {
  update: (isBattle) => {
    isBattle$.next(isBattle);
  },
  subscribe: (isBattle) => isBattle$.subscribe(isBattle),

};

export const Trainer1Turn = {
  update: (isTrainer1Turn) => {
    isTrainer1Turn$.next(isTrainer1Turn);
  },
  subscribe: (isTrainer1Turn) => isTrainer1Turn$.subscribe(isTrainer1Turn),
  getValue: () => isTrainer1Turn$.value,

};

export const PokemonFighting1 = {
  update: (pokemonFighting2) => {
    pokemonFighting1$.next(pokemonFighting2);
  },
  getFirstPokemon: () => {
    const firstPokemon = Trainer1Team.getValue()[0];
    PokemonFighting1.update(firstPokemon);
  },
  subscribe: (pokemonFighting2) => pokemonFighting1$.subscribe(pokemonFighting2),
  getValue: () => pokemonFighting1$.value,
};

export const PokemonFighting2 = {
  update: (pokemonFighting2) => {
    pokemonFighting2$.next(pokemonFighting2);
  },
  getFirstPokemon: () => {
    const firstPokemon = Trainer2Team.getValue()[0];
    PokemonFighting2.update(firstPokemon);
  },
  subscribe: (pokemonFighting2) => pokemonFighting2$.subscribe(pokemonFighting2),
  getValue: () => pokemonFighting2$.value,
};

export const PokemonBattle = {
  update: (pokemon) => {
    pokemonBattle$.next(pokemon);
  },
  subscribe: (setPokemon) => pokemonBattle$.subscribe(setPokemon),
  getValue: () => pokemonBattle$.value,
  isBattle: () => isBattle$.value,
  trainer1Turn: () => isTrainer1Turn$.value,
  startBattle: () => {
    PokemonFighting1.getFirstPokemon();
    PokemonFighting2.getFirstPokemon();
  },
};

export default {
  PokemonBattle, IsBattle, Trainer1Turn,
};
