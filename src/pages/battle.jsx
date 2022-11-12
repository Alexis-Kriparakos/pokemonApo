/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';

import Header from '../components/Header/Header';
import MoveSelection from '../components/MoveSelection/MoveSelection';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import { PHASES, TYPE_TO_IMG } from '../constants/constants';
import { PokemonBattle } from '../store/pokemonBattle';

import styles from './battle.module.scss';

export default function Battle() {
  const [battleInfo, setBattleInfo] = useState();
  const [pokemonFighting1, setPokemonFighting1] = useState();
  const [pokemonFighting2, setPokemonFighting2] = useState();
  const [selectedMoveP1, setSelectedMoveP1] = useState();
  const [selectedMoveP2, setSelectedMoveP2] = useState();

  const healthBarStyle = useCallback(pokemon => {
    if (!pokemon) return;
    const style = {
      backgroundColor: '#5ABA4A',
      width: `${((pokemon.battleStats.hpStat / pokemon.stats.hpStat) * 100).toFixed(3)}%`,
      height: '0.375rem',
      borderRadius: '0.625rem',
    };
    return (
      <div className={styles.healthStatus}>
        <div className={styles.healthText}>
          <span>{pokemon.name.toUpperCase()}</span>
          <span>lvl.100</span>
          <div>
            {pokemon.types.map(type => (
              <img key={type} src={`/assets/img/${TYPE_TO_IMG[type]}`} alt={type} className={styles.typeImg} />
            ))}
          </div>
        </div>
        <div className={styles.statsBar}>
          <div style={style} />
        </div>
        <span>{`${pokemon.battleStats.hpStat} / ${pokemon.stats.hpStat}`}</span>
      </div>
    );
  }, [pokemonFighting1, pokemonFighting2]);

  function resetChoices() {
    const battle = PokemonBattle.getValue();
    PokemonBattle.update(
      { ...battle, status: PHASES.PLAYER1_MOVE_CHOICE }
    );
  }

  useEffect(() => {
    PokemonBattle.startBattle();
    const pokemonBattle$ = PokemonBattle.subscribe(battle => {
      console.log(battle);
      setBattleInfo(battle);
      setSelectedMoveP1(battle.movePlayer1);
      setSelectedMoveP2(battle.movePlayer2);
    });
    const pokemonsBattling$ = PokemonBattle.getPokemonInBattle$().subscribe(([pokemon1, pokemon2]) => {
      setPokemonFighting1(pokemon1);
      setPokemonFighting2(pokemon2);
      if (!pokemon1.isAlive) {

      }
    });
    return () => {
      pokemonBattle$.unsubscribe();
      pokemonsBattling$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!battleInfo) return;
    const { status } = battleInfo;
    const [pokemonTeam1, pokemonTeam2] = PokemonBattle.getPokemonFighting();
    const battle = PokemonBattle.getValue();
    switch (status) {
      case PHASES.PLAYER1_MOVE_CHOICE.message:
        console.log(PHASES.PLAYER1_MOVE_CHOICE);
        break;
      case PHASES.PLAYER2_MOVE_CHOICE.message:
        console.log(PHASES.PLAYER2_MOVE_CHOICE);
        break;
      case PHASES.BATTLE_PHASE.message:
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
      case PHASES.SWITCH_POKEMON1.message:
        break;
      case PHASES.SWITCH_POKEMON2.message:
        break;
      default:
        break;
    }
  }, [battleInfo]);

  if (!pokemonFighting1 || !pokemonFighting2) return null;

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.teamContainer}>
          <PokemonTeam
            trainer="1"
            team={PokemonBattle.getTeam1$()}
            isBattle
            isLeft
            onClick={poke => {
              const battle = PokemonBattle.getValue();
              if (!battle.status.switch1) return;
              const newTeam = battle.teamPlayer1.filter(_poke => _poke.id !== poke.id);
              PokemonBattle.update({ ...battle, pokemonFighting1: poke, teamPlayer1: [poke, ...newTeam] });
            }}
          />
        </div>
        <div className={styles.battleContainer}>
          <div className={styles.arena}>
            <div className={styles.leftSide}>
              {healthBarStyle(pokemonFighting1)}
              <div className={styles.bottomPokemon}>
                <img className={styles.sprite} src={pokemonFighting1?.sprites?.back_default} alt="" />
              </div>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.topPokemon}>
                <img className={styles.sprite} src={pokemonFighting2?.sprites?.front_default} alt="" />
              </div>
              {healthBarStyle(pokemonFighting2)}
            </div>
          </div>
          <div className={styles.battleStatusMessageContainer}>
            {battleInfo.status.message}
          </div>
        </div>
        <div className={styles.teamContainer}>
          <PokemonTeam
            trainer="2"
            team={PokemonBattle.getTeam2$()}
            isBattle
            onClick={poke => {
              const battle = PokemonBattle.getValue();
              if (!battle.status.switch1) return;
              const newTeam = battle.teamPlayer2.filter(_poke => _poke.id !== poke.id);
              PokemonBattle.update({ ...battle, pokemonFighting2: poke, teamPlayer2: [poke, ...newTeam] });
            }}
          />
        </div>
      </div>
      <div className={styles.movesContainer}>
        <MoveSelection
          player1Moves
          pokemon={pokemonFighting1}
          onClick={move => {
            const battle = PokemonBattle.getValue();
            PokemonBattle.update(
              { ...battle, movePlayer1: move, status: PHASES.PLAYER2_MOVE_CHOICE }
            );
          }}
          onClickSwitch={() => {
            const battle = PokemonBattle.getValue();
            PokemonBattle.update(
              { ...battle, status: PHASES.SWITCH_POKEMON1 }
            );
          }}
          status={battleInfo.status}
        />
        <MoveSelection
          player2Moves
          pokemon={pokemonFighting2}
          onClick={move => {
            const battle = PokemonBattle.getValue();
            PokemonBattle.update({ ...battle, movePlayer2: move, status: PHASES.BATTLE_PHASE });
          }}
          onClickSwitch={() => {
            const battle = PokemonBattle.getValue();
            PokemonBattle.update(
              { ...battle, status: PHASES.SWITCH_POKEMON2 }
            );
          }}
          status={battleInfo.status}
        />
      </div>
    </>
  );
}
