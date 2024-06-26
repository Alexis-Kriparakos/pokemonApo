/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';

import Header from '../components/Header/Header';
import MoveSelection from '../components/MoveSelection/MoveSelection';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import { PHASES, TYPE_TO_IMG } from '../constants/constants';
import { PokemonBattle } from '../store/pokemonBattle';

import styles from './battle.module.scss';
import Loader from '../components/Loader';
import io from 'socket.io-client';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';

const socket = io('http://localhost:3010'); // Update with the server address


export default function Battle() {
  const [battlestart, setBattleStart] = useState(false);
  const [pokemonFightingMain, setPokemonFightingMain] = useState(null);
  const [pokemonFightingOpponent, setPokemonFightingOpponent] = useState(null);
  const [moveSelectedMain, setMoveSelctedMain] = useState(null);
  const [moveSelectedOpponent, setMoveSelectedOpponent] = useState(null);

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
  }, [pokemonFightingMain, pokemonFightingOpponent]);


  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit('leaveQueue');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    socket.on('startGame', () => {
      const team = Trainer1Team.getValue();
      socket.emit('submitPlayerTeam', team);
      setBattleStart(true);
      // Start the game logic here
    });

    socket.on('receiveOpponentTeam', (opponentTeam) => {
      Trainer2Team.update(opponentTeam);
      PokemonBattle.startBattle();
      PokemonBattle.getValue();
    });

    socket.on('receiveOpponentMove', (opponentMove) => {
      console.log(opponentMove);
      setMoveSelectedOpponent(opponentMove);
    })

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      socket.off('startGame');
      socket.off('receiveOpponentTeam');
    };
  }, []);

  useEffect(() => {
    PokemonBattle.startBattle();
    const pokemonBattle$ = PokemonBattle.subscribe(battle => {
      // setBattleInfo(battle);
      // setBattleStatus(battle.status);
      setPokemonFightingMain(battle.pokemonFighting1);
      setPokemonFightingOpponent(battle.pokemonFighting2);
      // setSelectedMoveP1(battle.movePlayer1);
      // setSelectedMoveP2(battle.movePlayer2);
    });
    return () => {
      pokemonBattle$.unsubscribe();
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
      </div>): (
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
              this is a battle status message
            </div>
          </div>
          <div className={styles.teamContainer}>
            <PokemonTeam
              trainer="2"
              team={Trainer2Team}
              isBattle
              onClick={poke => {console.log(poke)}}
            />
          </div>
        </div>
        <div className={styles.movesContainer}>
          <MoveSelection
            player1Moves
            pokemon={pokemonFightingMain}
            onClick={move => {
             setMoveSelctedMain(move);
             socket.emit('playerSelectedMove', move);
            }}
            onClickSwitch={() => {
              console.log('switch pokemon main');
            }}
            isDisabled={!!moveSelectedMain}
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
