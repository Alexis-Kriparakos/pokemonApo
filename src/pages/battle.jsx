/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import MoveSelection from '../components/MoveSelection/MoveSelection';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';
import { PokemonBattle, PokemonFighting1, PokemonFighting2 } from '../store/pokemonBattle';
import Header from '../components/Header/Header';

import {
  CHARMADER1, BULBASUAR1, CHARMADER2, BULBASUAR2,
} from '../DummyPokemon';
import { PHASES } from '../constants/constants';
import styles from './battle.module.css';

export default function Battle() {
  const [battleStatus, setBattleStatus] = useState();
  const [pokemonFighting1, setPokemonFighting1] = useState(CHARMADER1);
  const [pokemonFighting2, setPokemonFighting2] = useState(BULBASUAR2);
  const [selectedMoveP1, setSelectedMoveP1] = useState();
  const [selectedMoveP2, setSelectedMoveP2] = useState();
  const [player1Disabled, setPlayer1Disabled] = useState(false);
  const [player2Disabled, setPlayer2Disabled] = useState(false);

  useEffect(() => {
    PokemonFighting1.update(CHARMADER1);
    PokemonFighting2.update(BULBASUAR2);
    Trainer1Team.update([CHARMADER1, BULBASUAR1]);
    Trainer2Team.update([BULBASUAR2, CHARMADER2]);
    const pokemonBattle$ = PokemonBattle.subscribe(setBattleStatus);
    return () => {
      pokemonBattle$.unsubscribe();
    };
    // PokemonBattle.startBattle();
    // const pokemonFighting1$ = PokemonFighting1.subscribe(setPokemonFighting1);
    // const pokemonFighting2$ = PokemonFighting2.subscribe(setPokemonFighting2);
    // return () => {
    //   pokemonFighting1$.unsubscribe();
    //   pokemonFighting2$.unsubscribe();
    // };
  }, []);

  useEffect(() => {
    if (!battleStatus) return;
    const [pokemonTeam1, pokemonTeam2] = PokemonBattle.getPokemonFighting();
    switch (battleStatus.status) {
      case PHASES.PLAYER1_MOVE_CHOICE:
        setPlayer1Disabled(false);
        setPlayer2Disabled(true);
        console.log(PHASES.PLAYER1_MOVE_CHOICE);
        break;
      case PHASES.PLAYER2_MOVE_CHOICE:
        setPlayer2Disabled(false);
        setPlayer1Disabled(true);
        console.log(PHASES.PLAYER2_MOVE_CHOICE);
        break;
      case PHASES.BATTLE_PHASE:
        setTimeout(() => {
          if (pokemonTeam1.battleStats.speedStat >= pokemonTeam2.battleStats.speedStat) {
            PokemonBattle.executeMove(pokemonTeam1, pokemonTeam2, selectedMoveP1);
            PokemonBattle.updateTeam(pokemonTeam2, 'team2');
            if (true) {
              PokemonBattle.update({ ...battleStatus, status: PHASES.SWITCH_POKEMON2 });
              return;
            }
            PokemonBattle.executeMove(pokemonTeam2, pokemonTeam1, selectedMoveP2);
            PokemonBattle.updateTeam(pokemonTeam1, 'team1');
            return;
          }
          PokemonBattle.executeMove(pokemonTeam2, pokemonTeam1, selectedMoveP2);
          PokemonBattle.updateTeam(pokemonTeam1, 'team1');
          if (true) {
            PokemonBattle.update({ ...battleStatus, status: PHASES.SWITCH_POKEMON1 });
            return;
          }
          PokemonBattle.executeMove(pokemonTeam1, pokemonTeam2, selectedMoveP1);
          PokemonBattle.updateTeam(pokemonTeam2, 'team2');
        }, 1000);
        console.log(PHASES.BATTLE_PHASE);
        break;
      default:
        break;
    }
  }, [battleStatus]);

  return (
    <>
      <header>
        <Header />
        <Link href="/">
          <a className={styles.link}>
            Home
          </a>
        </Link>
      </header>
      <div className={styles.mainContainer}>
        <div className={styles.teamContainer}>
          <PokemonTeam trainer="1" />
        </div>
        {/* <div className={styles.battleContainer} /> */}
        <div className={styles.teamContainer}>
          <PokemonTeam trainer="2" />
        </div>
      </div>
      <div className={styles.movesContainer}>
        <MoveSelection
          pokemon={pokemonFighting1}
          onClick={(move) => {
            setSelectedMoveP1(move);
            PokemonBattle.update({ ...battleStatus, status: PHASES.PLAYER2_MOVE_CHOICE });
          }}
          isDisabled={player1Disabled}
        />
        <MoveSelection
          pokemon={pokemonFighting2}
          onClick={(move) => {
            setSelectedMoveP2(move);
            PokemonBattle.update({ ...battleStatus, status: PHASES.BATTLE_PHASE });
          }}
          isDisabled={player2Disabled}
        />
      </div>
    </>
  );
}
