/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
import MoveSelection from '../components/MoveSelection/MoveSelection';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import { PHASES } from '../constants/constants';
import { PokemonBattle } from '../store/pokemonBattle';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';

// import {
//   CHARMADER1, BULBASUAR1, CHARMADER2, BULBASUAR2,
// } from '../DummyPokemon';
import styles from './battle.module.css';

export default function Battle() {
  const [battleInfo, setBattleInfo] = useState();
  const [battleStatus, setBattleStatus] = useState();
  const [pokemonFighting1, setPokemonFighting1] = useState();
  const [pokemonFighting2, setPokemonFighting2] = useState();
  const [selectedMoveP1, setSelectedMoveP1] = useState();
  const [selectedMoveP2, setSelectedMoveP2] = useState();
  const [player1Disabled, setPlayer1Disabled] = useState(false);
  const [player2Disabled, setPlayer2Disabled] = useState(false);

  function resetChoices() {
    setPlayer1Disabled(false);
    setPlayer2Disabled(true);
    setSelectedMoveP1(undefined);
    setSelectedMoveP2(undefined);
  }

  useEffect(() => {
    PokemonBattle.startBattle();
    const pokemonBattle$ = PokemonBattle.subscribe(battle => {
      console.log(battle);
      setBattleInfo(battle);
      setBattleStatus(battle.status);
      setPokemonFighting1(battle.pokemonFighting1);
      setPokemonFighting2(battle.pokemonFighting2);
      setSelectedMoveP1(battle.movePlayer1);
      setSelectedMoveP2(battle.movePlayer2);
    });
    return () => {
      pokemonBattle$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!battleStatus) return;
    const [pokemonTeam1, pokemonTeam2] = PokemonBattle.getPokemonFighting();
    const battle = PokemonBattle.getValue();
    switch (battleStatus) {
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
            const poke2 = PokemonBattle
              .executeMove(pokemonTeam1, pokemonTeam2, selectedMoveP1);
            PokemonBattle.updateTeam2(poke2);
            if (!poke2.isAlive) {
              PokemonBattle.update({ ...battle, status: PHASES.SWITCH_POKEMON2 });
              resetChoices();
              return;
            }
            const poke1 = PokemonBattle
              .executeMove(pokemonTeam2, pokemonTeam1, selectedMoveP2);
            PokemonBattle.updateTeam1(poke1);
            resetChoices();
            return;
          }
          const poke1 = PokemonBattle.executeMove(pokemonTeam2, pokemonTeam1, selectedMoveP2);
          PokemonBattle.updateTeam1(poke1);
          if (!poke1.isAlive) {
            PokemonBattle.update({ ...battle, status: PHASES.SWITCH_POKEMON1 });
            resetChoices();
            return;
          }
          const poke2 = PokemonBattle.executeMove(pokemonTeam1, pokemonTeam2, selectedMoveP1);
          PokemonBattle.updateTeam2(poke2);
          resetChoices();
        }, 1000);
        console.log(PHASES.BATTLE_PHASE);
        break;
      case PHASES.SWITCH_POKEMON1:
        setPlayer1Disabled(true);
        setPlayer2Disabled(true);
        console.log(PHASES.SWITCH_POKEMON1);
        break;
      case PHASES.SWITCH_POKEMON2:
        setPlayer1Disabled(true);
        setPlayer2Disabled(true);
        console.log(PHASES.SWITCH_POKEMON2);
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
          <PokemonTeam
            trainer="1"
            team={Trainer1Team}
            isBattle
            onClick={poke => {
              const battle = PokemonBattle.getValue();
              const newTeam = battle.teamPlayer1.filter(_poke => _poke.id !== poke.id);
              PokemonBattle.update({ ...battle, pokemonFighting1: poke, teamPlayer1: [poke, ...newTeam] });
              setPlayer1Disabled(false);
              setPlayer2Disabled(true);
            }}
          />
        </div>
        {/* <div className={styles.battleContainer} /> */}
        <div className={styles.teamContainer}>
          <PokemonTeam
            trainer="2"
            team={Trainer2Team}
            isBattle
            onClick={poke => {
              const battle = PokemonBattle.getValue();
              const newTeam = battle.teamPlayer2.filter(_poke => _poke.id !== poke.id);
              PokemonBattle.update({ ...battle, pokemonFighting2: poke, teamPlayer2: [poke, ...newTeam] });
              setPlayer1Disabled(false);
              setPlayer2Disabled(true);
            }}
          />
        </div>
      </div>
      <div className={styles.movesContainer}>
        <MoveSelection
          pokemon={pokemonFighting1}
          onClick={move => {
            const battle = PokemonBattle.getValue();
            PokemonBattle.update(
              { ...battle, movePlayer1: move, status: PHASES.PLAYER2_MOVE_CHOICE }
            );
          }}
          isDisabled={player1Disabled}
        />
        <MoveSelection
          pokemon={pokemonFighting2}
          onClick={move => {
            const battle = PokemonBattle.getValue();
            PokemonBattle.update({ ...battle, movePlayer2: move, status: PHASES.BATTLE_PHASE });
          }}
          isDisabled={player2Disabled}
        />
      </div>
    </>
  );
}
