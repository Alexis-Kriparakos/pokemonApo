/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Link from 'next/link';

import { getPokemonList, getPokemon } from '../api/pokemon';
import PokemonStore from '../store/pokemonStrore';
import PokemonToShow from '../store/pokemonToShow';

import PokemonList from '../components/PokemonList/PokemonList';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';

import Header from '../components/Header/Header';
import { transformPokemon } from '../helpers/transformer';
import styles from './index.module.css';

export default function Index() {
  useEffect(() => {
    const limit = 20;
    async function getData() {
      const pokemonList = await getPokemonList(limit);
      const pokemonListWithStats = await Promise.all(pokemonList.map((p) => {
        const pokemon = getPokemon(p.name);
        return pokemon;
      }));
      const pokemonListWithUpdatedStats = pokemonListWithStats
        .map((poke) => transformPokemon(poke));
      PokemonStore.update(pokemonListWithUpdatedStats);
      PokemonToShow.update(pokemonListWithUpdatedStats);
    }
    // getData();
  }, []);

  return (
    <>
      <header>
        <Header />
        <Link href="/battle">
          <a className={styles.link}>
            BATTLE
          </a>
        </Link>
      </header>
      <main className={styles.mainContainer}>
        <PokemonTeam trainer="1" />
        <PokemonList />
        <PokemonTeam trainer="2" />
      </main>
    </>
  );
}
