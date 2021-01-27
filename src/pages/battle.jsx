import {useEffect} from 'react';
import Link from 'next/link'
import {getPokemonList,getPokemon} from '../api/pokemon'
import PokemonStore from '../store/pokemonStrore'
import PokemonToShow from '../store/pokemonToShow'

import PokemonList from '../components/PokemonList/PokemonList';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';


import Header from '../components/Header/Header'

import styles from './battle.module.css';

export default function Battle() {
  
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
      <PokemonTeam trainer={'1'}/>
      <div className={styles.battleContainer}>

      </div>
      <PokemonTeam trainer={'2'}/>
    </main>
    </>
  )
}

