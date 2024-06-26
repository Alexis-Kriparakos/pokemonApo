import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { PHASES } from '../constants/constants';
import { calculateDamage } from '../helpers/damage';

import { Trainer1Team, Trainer2Team } from './teamStore';


const INITIAL_VALUE = {
  status: PHASES.PLAYER1_MOVE_CHOICE,
  movePlayer1: {},
  movePlayer2: {},
  teamPlayer1: [],
  teamPlayer2: [],
  pokemonFighting1: {},
  pokemonFighting2: {},
  winner: '',
}

const pokemonBattle$ = new BehaviorSubject(INITIAL_VALUE);

export const PokemonBattle = {
  getSubject: () => pokemonBattle$,
  update: battleInfo => {
    pokemonBattle$.next(battleInfo);
  },
  subscribe: setBattleInfo => pokemonBattle$.subscribe(setBattleInfo),
  getValue: () => pokemonBattle$.value,
  startBattle: () => {
    const pokemon1 = cloneDeep(Trainer1Team.getStartingPokemon());
    const pokemon2 = cloneDeep(Trainer2Team.getStartingPokemon());
    const team1 = cloneDeep(Trainer1Team.getValue());
    const team2 = cloneDeep(Trainer2Team.getValue());
    const battle = PokemonBattle.getValue();
    PokemonBattle.update({
      ...battle,
      teamPlayer1: team1,
      teamPlayer2: team2,
      pokemonFighting1: pokemon1,
      pokemonFighting2: pokemon2,
    });
  },
  getPokemonFighting: () => {
    const battle = PokemonBattle.getValue();
    return [battle.pokemonFighting1, battle.pokemonFighting2];
  },
  executeMove: (pokemonAttacking, pokemonDefending, move) => {
    const damageDealt = calculateDamage(pokemonAttacking, pokemonDefending, move);
    const { battleStats: updatedBattleStats } = pokemonDefending;
    if (updatedBattleStats.hpStat - damageDealt > 0) {
      updatedBattleStats.hpStat = updatedBattleStats.hpStat - damageDealt;
      return { ...pokemonDefending, battleStats: updatedBattleStats };
    }
    updatedBattleStats.hpStat = 0;
    return { ...pokemonDefending, battleStats: updatedBattleStats, isAlive: false };
  },
  getPokemonInBattle$() {
    return pokemonBattle$.pipe(map(battle => [battle.pokemonFighting1, battle.pokemonFighting2]));
  },
  getTeam1$() {
    return pokemonBattle$.pipe(map(battle => battle.teamPlayer1));
  },
  getTeam2$() {
    return pokemonBattle$.pipe(map(battle => battle.teamPlayer2));
  },
  updateTeam1: pokemonInjured => {
    const teamTemp = PokemonBattle.getValue().teamPlayer1.filter(poke => poke.id !== pokemonInjured.id);
    const newTeam = [pokemonInjured, ...teamTemp];
    const battle = PokemonBattle.getValue();
    PokemonBattle.update({ ...battle, teamPlayer1: newTeam, pokemonFighting1: pokemonInjured });
  },
  updateTeam2: pokemonInjured => {
    const teamTemp = PokemonBattle.getValue().teamPlayer2.filter(poke => poke.id !== pokemonInjured.id);
    const newTeam = [pokemonInjured, ...teamTemp];
    const battle = PokemonBattle.getValue();
    PokemonBattle.update({ ...battle, teamPlayer2: newTeam, pokemonFighting2: pokemonInjured });
  },
};

export default {
  PokemonBattle,
};
