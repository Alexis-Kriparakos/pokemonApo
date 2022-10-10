import { BehaviorSubject } from 'rxjs';
import { Trainer1Team, Trainer2Team } from './teamStore';
import { calculateDamage } from '../helpers/damage';
import { PHASES } from '../constants/constants';

const pokemonBattle$ = new BehaviorSubject({ status: PHASES.PLAYER1_MOVE_CHOICE });
const pokemonFighting1$ = new BehaviorSubject({});
const pokemonFighting2$ = new BehaviorSubject({});

// const isBattle$ = new BehaviorSubject(false);
const isTrainer1Turn$ = new BehaviorSubject(true);
// const isTrainer2Turn$ = new BehaviorSubject(true);

// export const IsBattle = {
//   update: (isBattle) => {
//     isBattle$.next(isBattle);
//   },
//   subscribe: (isBattle) => isBattle$.subscribe(isBattle),

// };

export const Trainer1Turn = {
  update: (isTrainer1Turn) => {
    isTrainer1Turn$.next(isTrainer1Turn);
  },
  subscribe: (isTrainer1Turn) => isTrainer1Turn$.subscribe(isTrainer1Turn),
  getValue: () => isTrainer1Turn$.value,
};

// export const Trainer2Turn = {
//   update: (isTrainer2Turn) => {
//     isTrainer2Turn$.next(isTrainer2Turn);
//   },
//   subscribe: (isTrainer2Turn) => isTrainer2Turn$.subscribe(isTrainer2Turn),
//   getValue: () => isTrainer2Turn$.value,
// };

export const PokemonFighting1 = {
  update: (pokemonFighting1) => {
    pokemonFighting1$.next(pokemonFighting1);
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
  startBattle: () => {
    PokemonFighting1.getFirstPokemon();
    PokemonFighting2.getFirstPokemon();
  },
  getPokemonFighting: () => [PokemonFighting1.getValue(), PokemonFighting2.getValue()],
  executeMove: (pokemonAttacking, pokemonDefending, move) => {
    const damageDealt = calculateDamage(pokemonAttacking, pokemonDefending, move);
    const { battleStats: updatedBattleStats } = pokemonDefending;
    if (updatedBattleStats.hpStat - damageDealt > 0) {
      updatedBattleStats.hpStat -= damageDealt;
      return { ...pokemonDefending, battleStats: updatedBattleStats };
    }
    updatedBattleStats.hpStat = 0;
    return { ...pokemonDefending, battleStats: updatedBattleStats, isAlive: false };
  },
  updateTeam1: (pokemonInjured) => {
    const teamTemp = Trainer1Team.getValue().filter((poke) => poke.id !== pokemonInjured.id);
    const newTeam = [pokemonInjured, ...teamTemp];
    PokemonFighting1.update(pokemonInjured);
    Trainer1Team.update(newTeam);
  },
  updateTeam2: (pokemonInjured) => {
    const teamTemp = Trainer2Team.getValue().filter((poke) => poke.id !== pokemonInjured.id);
    const newTeam = [pokemonInjured, ...teamTemp];
    PokemonFighting2.update(pokemonInjured);
    Trainer2Team.update(newTeam);
  },
};

export default {
  PokemonBattle, Trainer1Turn,
};
