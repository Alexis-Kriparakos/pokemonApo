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
  // const healthBarStyle = useCallback(pokemon => {
  //   if (!pokemon) return;
  //   const style = {
  //     backgroundColor: '#5ABA4A',
  //     width: `${((pokemon.battleStats.hpStat / pokemon.stats.hpStat) * 100).toFixed(3)}%`,
  //     height: '0.375rem',
  //     borderRadius: '0.625rem',
  //   };
  //   return (
  //     <div className={styles.healthStatus}>
  //       <div className={styles.healthText}>
  //         <span>{pokemon.name.toUpperCase()}</span>
  //         <span>lvl.100</span>
  //         <div>
  //           {pokemon.types.map(type => (
  //             <img key={type} src={`/assets/img/${TYPE_TO_IMG[type]}`} alt={type} className={styles.typeImg} />
  //           ))}
  //         </div>
  //       </div>
  //       <div className={styles.statsBar}>
  //         <div style={style} />
  //       </div>
  //       <span>{`${pokemon.battleStats.hpStat} / ${pokemon.stats.hpStat}`}</span>
  //     </div>
  //   );
  // }, [pokemonFighting1, pokemonFighting2]);

  const [battlestart, setBattleStart] = useState(false);

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
      console.log(opponentTeam);
      Trainer2Team.update(opponentTeam);
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      socket.off('startGame');
      socket.off('receiveOpponentTeam');
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
            {/* <div className={styles.arena}>
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
            </div> */}
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
          {/* <MoveSelection
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
          /> */}
          {/* <MoveSelection
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
          /> */}
        </div>
      </>
      )}
    </section>
  );
}
