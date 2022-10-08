/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Link from 'next/link';
import get from 'lodash/get';

import { getPokemonList, getPokemon } from '../api/pokemon';
import PokemonStore from '../store/pokemonStrore';
import PokemonToShow from '../store/pokemonToShow';

import PokemonList from '../components/PokemonList/PokemonList';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';

import Header from '../components/Header/Header';

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
      const pokemonListWithUpdatedStats = pokemonListWithStats.map((poke) => {
        const hpStat = Math.ceil(get(poke, 'stats[0].base_stat') * 4.5);
        const atkStat = Math.ceil(get(poke, 'stats[1].base_stat') * 3.2);
        const defStat = Math.ceil(get(poke, 'stats[2].base_stat') * 3.2);
        const spAtkStat = Math.ceil(get(poke, 'stats[3].base_stat') * 3.2);
        const spDefStat = Math.ceil(get(poke, 'stats[4].base_stat') * 3.5);
        const speedStat = Math.ceil(get(poke, 'stats[5].base_stat') * 3);
        const newPoke = {
          ...poke,
          searchTerms: [`${poke.name}`, `${poke.name.toUpperCase()}`],
          battleStats: {
            hpStat, atkStat, defStat, spAtkStat, spDefStat, speedStat,
          },
        };
        return newPoke;
      });
      PokemonStore.update(pokemonListWithUpdatedStats);
      PokemonToShow.update(pokemonListWithUpdatedStats);
    }
    getData();
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
