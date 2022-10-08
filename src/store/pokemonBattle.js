import { BehaviorSubject } from 'rxjs';

const pokemonBattle$ = new BehaviorSubject({});
const trainer1Team$ = new BehaviorSubject([]);
const trainer2Team$ = new BehaviorSubject([]);

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

export const Trainer1Team = {
  update: (trainer1Team) => {
    trainer1Team$.next(trainer1Team);
  },
  subscribe: (trainer1Team) => trainer1Team$.subscribe(trainer1Team),
  getValue: () => trainer1Team$.value,
};

export const Trainer2Team = {
  update: (trainer2Team) => {
    trainer2Team$.next(trainer2Team);
  },
  subscribe: (trainer2Team) => trainer2Team$.subscribe(trainer2Team),
  getValue: () => trainer2Team$.value,

};

export const PokemonBattle = {
  update: (pokemon) => {
    pokemonBattle$.next(pokemon);
  },
  subscribe: (setPokemon) => pokemonBattle$.subscribe(setPokemon),
  getValue: () => pokemonBattle$.value,
  isBattle: () => isBattle$.value,
  trainer1Turn: () => isTrainer1Turn$.value,
  trainer1Team: () => trainer1Team$.value,
  trainer2Team: () => trainer2Team$.value,
};

export default {
  PokemonBattle, IsBattle, Trainer1Turn, Trainer1Team, Trainer2Team,
};
