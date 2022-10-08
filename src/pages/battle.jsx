import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import MoveSelection from '../components/MoveSelection/MoveSelection';
import { PokemonBattle, PokemonFighting1, PokemonFighting2 } from '../store/pokemonBattle';
import Header from '../components/Header/Header';

import styles from './battle.module.css';

export default function Battle() {
  const [pokemonFighting1, setPokemonFighting1] = useState();
  const [pokemonFighting2, setPokemonFighting2] = useState();

  function onClickSelectMove(move) {
    PokemonBattle.executeMove(move);
    console.log(move);
  }

  useEffect(() => {
    PokemonBattle.startBattle();
    const pokemonFighting1$ = PokemonFighting1.subscribe(setPokemonFighting1);
    const pokemonFighting2$ = PokemonFighting2.subscribe(setPokemonFighting2);
    return () => {
      pokemonFighting1$.unsubscribe();
      pokemonFighting2$.unsubscribe();
    };
  }, []);

  return (
    <>
      <header>
        <Header />
        {/* <Link href="/">
        <a className={styles.link}>
          Home
        </a>
      </Link> */}
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
        <MoveSelection pokemon={pokemonFighting1} onClick={(move) => onClickSelectMove(move)} />
        <MoveSelection pokemon={pokemonFighting2} onClick={(move) => onClickSelectMove(move)} />
      </div>

    </>
  );
}
