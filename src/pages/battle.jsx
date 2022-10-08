import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';
import { PokemonBattle, PokemonFighting1, PokemonFighting2 } from '../store/pokemonBattle';
import Header from '../components/Header/Header';

import styles from './battle.module.css';

export default function Battle() {
  const [pokemonFighting1, setPokemonFighting1] = useState();
  const [pokemonFighting2, setPokemonFighting2] = useState();

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
      <main className={styles.mainContainer}>
        <div className={styles.teamContainer}>
          <PokemonTeam trainer="1" />
        </div>
        <div className={styles.battleContainer} />
        <div className={styles.teamContainer}>
          <PokemonTeam trainer="2" />
        </div>
      </main>
    </>
  );
}
