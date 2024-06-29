/* eslint-disable jsx-a11y/anchor-is-valid */
import isEmpty from 'lodash/isEmpty';
import React, { useState, useEffect, useCallback } from 'react';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import io from 'socket.io-client';

import Header from '../components/Header/Header';
import Loader from '../components/Loader';
import MoveSelection from '../components/MoveSelection/MoveSelection';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import { PHASES, TYPE_TO_IMG } from '../constants/constants';
import { PokemonBattle } from '../store/pokemonBattle';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';

import styles from './battle.module.scss';

const socket = io('http://localhost:3010'); // Update with the server address

export default function Battle() {
  const [battlestart, setBattleStart] = useState(false);
  const [pokemonFightingMain, setPokemonFightingMain] = useState(null);
  const [pokemonFightingOpponent, setPokemonFightingOpponent] = useState(null);
  const [moveSelectedMain, setMoveSelctedMain] = useState(null);
  const [moveSelectedOpponent, setMoveSelectedOpponent] = useState(null);
  const [battlePhase, setBattlePhase] = useState('');
  const [movesDisabled, setMovesDisabled] = useState(false);

  function resetChoices() {
    const battle = PokemonBattle.getValue();
    PokemonBattle.update({ ...battle, movePlayer1: null, movePlayer2: null, status: PHASES.BATTLE_START });
    setMovesDisabled(false);
  }

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
          <div className={styles.typeContainer}>
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
  }, [pokemonFightingMain, pokemonFightingOpponent]);

  useEffect(() => {
    function handleBeforeUnload() {
      socket.emit('leaveQueue');
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    socket.on('startGame', () => {
      console.log('startGame');
      const team = Trainer1Team.getValue();
      socket.emit('submitPlayerTeam', team);
      setBattleStart(true);
      // Start the game logic here
    });

    socket.on('receiveOpponentTeam', opponentTeam => {
      Trainer2Team.update(opponentTeam);
      PokemonBattle.startBattle();
    });

    socket.on('receiveOpponentMove', ({ move: opponentMove, phase }) => {
      console.log(opponentMove);
      const battle = PokemonBattle.getValue();
      PokemonBattle.update({ ...battle, movePlayer2: opponentMove, status: phase });
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      socket.off('startGame');
      socket.off('receiveOpponentTeam');
    };
  }, []);

  useEffect(() => {
    PokemonBattle.startBattle();
    const pokemonBattle$ = PokemonBattle.subscribe(battle => {
      setPokemonFightingMain(battle.pokemonFighting1);
      setPokemonFightingOpponent(battle.pokemonFighting2);
      setMoveSelctedMain(battle.movePlayer1);
      setMoveSelectedOpponent(battle.movePlayer2);
    });

    const battlePhases$ = PokemonBattle.getSubject().pipe(distinctUntilKeyChanged('status')).subscribe(battleInfo => {
      const { status } = battleInfo;
      setBattlePhase(status);

      const { movePlayer1, movePlayer2, pokemonFighting1, pokemonFighting2 } = PokemonBattle.getValue();
      switch (status.message) {
        case PHASES.PLAYER_MOVE_CHOICE.message:
          setMovesDisabled(true);
          if (!isEmpty(movePlayer1) && !isEmpty(movePlayer2)) {
            const battle = PokemonBattle.getValue();
            PokemonBattle.update({ ...battle, status: PHASES.BATTLE_PHASE });
          }
          break;
        case PHASES.OPPONENT_MOVE_CHOICE.message:
          if (!isEmpty(movePlayer1) && !isEmpty(movePlayer2)) {
            const battle = PokemonBattle.getValue();
            PokemonBattle.update({ ...battle, status: PHASES.BATTLE_PHASE });
          }
          break;
        case PHASES.BATTLE_PHASE.message:
          console.log('battle');
          setTimeout(() => {
            if (pokemonFighting1.battleStats.speedStat >= pokemonFighting2.battleStats.speedStat) {
              const poke2 = PokemonBattle
                .executeMove(pokemonFighting1, pokemonFighting2, movePlayer1);
              PokemonBattle.updateTeam2(poke2);
              // if (!poke2.isAlive) {
              //   PokemonBattle.update({ ...battle, status: PHASES.SWITCH_POKEMON2 });
              //   resetChoices();
              //   return;
              // }
              const poke1 = PokemonBattle
                .executeMove(pokemonFighting2, pokemonFighting1, movePlayer2);
              PokemonBattle.updateTeam1(poke1);
              resetChoices();
              return;
            }
            const poke1 = PokemonBattle.executeMove(pokemonFighting2, pokemonFighting1, movePlayer2);
            PokemonBattle.updateTeam1(poke1);
            // if (!poke1.isAlive) {
            //   PokemonBattle.update({ ...battle, status: PHASES.SWITCH_POKEMON1 });
            //   resetChoices();
            //   return;
            // }
            const poke2 = PokemonBattle.executeMove(pokemonFighting1, pokemonFighting2, movePlayer1);
            PokemonBattle.updateTeam2(poke2);
            resetChoices();
          }, 1000);
          break;
        case PHASES.SWITCH_POKEMON1.message:
          return null;
        case PHASES.SWITCH_POKEMON2.message:
          return null;
        default:
          break;
      }
    });

    return () => {
      pokemonBattle$.unsubscribe();
      battlePhases$.unsubscribe();
    };
  }, []);

  return (
    <section>
      <Header />
      {!battlestart ? (
        <div className={styles.noPlayers}>
          <h1>Pokemon Battle</h1>
          <p>Waiting for another player to join...</p>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.mainContainer}>
            <div className={styles.teamContainer}>
              <PokemonTeam
                trainer="1"
                team={Trainer1Team}
                isBattle
                isLeft
                onClick={poke => console.log(poke)}
              />
            </div>
            <div className={styles.battleContainer}>
              <div className={styles.arena}>
                <div className={styles.leftSide}>
                  {healthBarStyle(pokemonFightingMain)}
                  <div className={styles.bottomPokemon}>
                    <img className={styles.sprite} src={pokemonFightingMain?.sprites?.back_default} alt="" />
                  </div>
                </div>
                <div className={styles.rightSide}>
                  <div className={styles.topPokemon}>
                    <img className={styles.sprite} src={pokemonFightingOpponent?.sprites?.front_default} alt="" />
                  </div>
                  {healthBarStyle(pokemonFightingOpponent)}
                </div>
              </div>
              <div className={styles.battleStatusMessageContainer}>
                {battlePhase.message}
              </div>
            </div>
            <div className={styles.teamContainer}>
              <PokemonTeam
                trainer="2"
                team={Trainer2Team}
                isBattle
                onClick={poke => { console.log(poke); }}
              />
            </div>
          </div>
          <div className={styles.movesContainer}>
            <MoveSelection
              player1Moves
              pokemon={pokemonFightingMain}
              onClick={move => {
                const battle = PokemonBattle.getValue();
                PokemonBattle.update({ ...battle, movePlayer1: move, status: PHASES.PLAYER_MOVE_CHOICE });
                socket.emit('playerSelectedMove', { move, phase: PHASES.OPPONENT_MOVE_CHOICE });
              }}
              onClickSwitch={() => {
                console.log('switch pokemon main');
              }}
              isDisabled={movesDisabled}
            />
            {/* <MoveSelection
            player2Moves
            pokemon={pokemonFightingOpponent}
            onClick={move => {
              console.log(move);
            }}
            onClickSwitch={() => {
              console.log('switch pokemon opponent');
            }}
          /> */}
          </div>
        </>
      )}
    </section>
  );
}
