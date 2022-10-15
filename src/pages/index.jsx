/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';

import { getData } from '../api/pokemon';
import PokemonStore from '../store/pokemonStrore';
import PokemonToShow from '../store/pokemonToShow';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';

import PokemonList from '../components/PokemonList/PokemonList';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import Header from '../components/Header/Header';

import styles from './index.module.scss';

export default function Index({ pokemon }) {
  useEffect(() => {
    PokemonStore.update(pokemon);
    const allPokemon = Object.values(pokemon);
    PokemonToShow.update({ region: 'kanto', pokemon: allPokemon[0] });
  }, []);

    <a href="https://twitter.com/Dave_Conner" className="btn btn-1">
      <svg>
        <rect x="0" y="0" fill="none" width="100%" height="100%" />
      </svg>
      Hover
    </a>;

    return (
      <>
        <header>
          <Header />
        </header>
        <main className={styles.mainContainer}>
          <PokemonTeam trainer="1" team={Trainer1Team} />
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
