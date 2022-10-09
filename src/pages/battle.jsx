/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import MoveSelection from '../components/MoveSelection/MoveSelection';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';
import { PokemonBattle, PokemonFighting1, PokemonFighting2 } from '../store/pokemonBattle';
import Header from '../components/Header/Header';

import { CHARMADER, BULBASUAR } from '../DummyPokemon';

import styles from './battle.module.css';

export default function Battle() {
  const [pokemonFighting1, setPokemonFighting1] = useState(CHARMADER);
  const [pokemonFighting2, setPokemonFighting2] = useState(BULBASUAR);
  const [selectedMoveP1, setSelectedMoveP1] = useState();
  const [selectedMoveP2, setSelectedMoveP2] = useState();

  useEffect(() => {
    PokemonFighting1.update(CHARMADER);
    PokemonFighting2.update(BULBASUAR);
    Trainer1Team.update([CHARMADER, BULBASUAR]);
    Trainer2Team.update([BULBASUAR, CHARMADER]);
    // PokemonBattle.startBattle();
    // const pokemonFighting1$ = PokemonFighting1.subscribe(setPokemonFighting1);
    // const pokemonFighting2$ = PokemonFighting2.subscribe(setPokemonFighting2);
    // return () => {
    //   pokemonFighting1$.unsubscribe();
    //   pokemonFighting2$.unsubscribe();
    // };
  }, []);

  useEffect(() => {
    if (!selectedMoveP1 || !selectedMoveP2) return;
    setTimeout(() => {
      PokemonBattle.executeMove(selectedMoveP1, selectedMoveP2);
    }, 2000);
  }, [selectedMoveP1, selectedMoveP2]);

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
        <MoveSelection pokemon={pokemonFighting1} onClick={(move) => setSelectedMoveP1(move)} />
        <MoveSelection pokemon={pokemonFighting2} onClick={(move) => setSelectedMoveP2(move)} />
      </div>
    </>
  );
}
