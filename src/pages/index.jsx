/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Link from 'next/link';

import { getData } from '../api/pokemon';
import PokemonStore from '../store/pokemonStrore';
import PokemonToShow from '../store/pokemonToShow';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';

import PokemonList from '../components/PokemonList/PokemonList';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import Header from '../components/Header/Header';

import { REGIONS_POKEMON } from '../constants/constants';
import styles from './index.module.css';

export default function Index({ pokemon }) {
  const allRegions = Object.keys(REGIONS_POKEMON);

  useEffect(() => {
    PokemonStore.update(pokemon);
    const allPokemon = Object.values(pokemon);
    PokemonToShow.update(...allPokemon);
  }, []);

  async function onSetRegion(region) {
    const allPokemon = PokemonStore.getValue();
    const pokemonNewRegion = await PokemonStore.onPokemonFetch(region);
    PokemonStore.update({ ...allPokemon, ...pokemonNewRegion });
    PokemonToShow.update(pokemonNewRegion[region]);
    console.log({ ...allPokemon, ...pokemonNewRegion });
  }

  return (
    <>
      <header>
        <Header />
        <Link href="/battle">
          <a className={styles.link}>
            BATTLE
          </a>
        </Link>
        {allRegions.map((region) => <button key={region} type="button" onClick={() => onSetRegion(region)}>{region}</button>)}
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
