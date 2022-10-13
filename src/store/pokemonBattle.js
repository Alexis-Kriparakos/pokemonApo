import { BehaviorSubject } from 'rxjs';
import { Trainer1Team, Trainer2Team } from './teamStore';
import { calculateDamage } from '../helpers/damage';
import { PHASES } from '../constants/constants';

const pokemonBattle$ = new BehaviorSubject(
  {
    status: PHASES.PLAYER1_MOVE_CHOICE,
    movePlayer1: {},
    movePlayer2: {},
    teamPlayer1: [],
    teamPlayer2: [],
    pokemonFighting1: {},
    pokemonFighting2: {},
    winner: '',
  },
);

export const PokemonBattle = {
  update: (battleInfo) => {
    pokemonBattle$.next(battleInfo);
  },
  subscribe: (setBattleInfo) => pokemonBattle$.subscribe(setBattleInfo),
  getValue: () => pokemonBattle$.value,
  startBattle: () => {
    const pokemon1 = Trainer1Team.getStartingPokemon();
    const pokemon2 = Trainer2Team.getStartingPokemon();
    const team1 = [...Trainer1Team.getValue()];
    const team2 = [...Trainer2Team.getValue()];
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
      updatedBattleStats.hpStat -= damageDealt;
      return { ...pokemonDefending, battleStats: updatedBattleStats };
    }
    updatedBattleStats.hpStat = 0;
    return { ...pokemonDefending, battleStats: updatedBattleStats, isAlive: false };
  },
  updateTeam1: (pokemonInjured) => {
    const teamTemp = Trainer1Team.getValue().filter((poke) => poke.id !== pokemonInjured.id);
    const newTeam = [pokemonInjured, ...teamTemp];
    const battle = PokemonBattle.getValue();
    PokemonBattle.update({ ...battle, teamPlayer1: newTeam, pokemonFighting1: pokemonInjured });
  },
  updateTeam2: (pokemonInjured) => {
    const teamTemp = Trainer2Team.getValue().filter((poke) => poke.id !== pokemonInjured.id);
    const newTeam = [pokemonInjured, ...teamTemp];
    const battle = PokemonBattle.getValue();
    PokemonBattle.update({ ...battle, teamPlayer2: newTeam, pokemonFighting2: pokemonInjured });
  },
};

export default {
  PokemonBattle,
};
