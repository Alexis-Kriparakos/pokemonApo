/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';

import { getData } from '../api/pokemon';
import Header from '../components/Header/Header';
import PokemonList from '../components/PokemonList/PokemonList';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import PokemonStore from '../store/pokemonStore';
import { PokemonToShow } from '../store/pokemonToShow';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';

import styles from './index.module.scss';

export default function Index({ pokemon }) {
  useEffect(() => {
    PokemonStore.update(pokemon);
    const [allPokemon] = Object.values(pokemon);
    PokemonToShow.update({ region: 'kanto', pokemon: allPokemon });
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className={styles.mainContainer}>
        <PokemonTeam trainer="1" team={Trainer1Team} isLeft />
        <PokemonList />
        <PokemonTeam trainer="2" team={Trainer2Team} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const [pokemon] = await Promise.all([
    getData(),
  ]);

  return {
    props: {
      pokemon,
    },
  };
}
