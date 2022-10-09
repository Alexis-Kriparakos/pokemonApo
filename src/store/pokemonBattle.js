import { BehaviorSubject } from 'rxjs';
import { Trainer1Team, Trainer2Team } from './teamStore';
import { calculateDamage } from '../helpers/damage';

const pokemonBattle$ = new BehaviorSubject({});
const pokemonFighting1$ = new BehaviorSubject({});
const pokemonFighting2$ = new BehaviorSubject({});

const isBattle$ = new BehaviorSubject(false);
const isTrainer1Turn$ = new BehaviorSubject(true);
const isTrainer2Turn$ = new BehaviorSubject(true);

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

export const Trainer2Turn = {
  update: (isTrainer2Turn) => {
    isTrainer2Turn$.next(isTrainer2Turn);
  },
  subscribe: (isTrainer2Turn) => isTrainer2Turn$.subscribe(isTrainer2Turn),
  getValue: () => isTrainer2Turn$.value,
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
  getPokemonFighting: () => [PokemonFighting1.getValue(), PokemonFighting2.getValue()],
  executeMove: (move1, move2) => {
    const [pokemonTeam1, pokemonTeam2] = PokemonBattle.getPokemonFighting();
    if (pokemonTeam1.battleStats.speedStat >= pokemonTeam1.battleStats.speedStat2) {
      const damageDealt = calculateDamage(pokemonTeam1, pokemonTeam2, move1);
      pokemonTeam2.battleStats.hpStat -= damageDealt;
      PokemonFighting2.update(pokemonTeam2);
      const teamTemp = Trainer2Team.getValue().filter((poke) => poke.id !== pokemonTeam2.id);
      const newTeam = [pokemonTeam2, ...teamTemp];
      Trainer2Team.update(newTeam);
    }
    console.log(pokemonTeam2, pokemonTeam1, move2);
    const damageDealt = calculateDamage(pokemonTeam2, pokemonTeam1, move2);
    pokemonTeam1.battleStats.hpStat -= damageDealt;
    PokemonFighting1.update(pokemonTeam1);
    const teamTemp = Trainer1Team.getValue().filter((poke) => poke.id !== pokemonTeam1.id);
    const newTeam = [pokemonTeam1, ...teamTemp];
    Trainer1Team.update(newTeam);
  },
};

export default {
  PokemonBattle, IsBattle, Trainer1Turn, Trainer2Turn,
};
