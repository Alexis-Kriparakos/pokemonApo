import {useEffect,useState} from 'react';
import {getPokemonList,getPokemon} from '../api/pokemon'
import PokemonStore from '../store/pokemonStrore'
import PokemonToShow from '../store/pokemonToShow'

import PokemonList from '../components/PokemonList/PokemonList';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';


import Header from '../components/Header/Header'

import styles from './index.module.css';

export default function Index() {
  useEffect(() => {
    const limit = 10;
    async function getData() {
      const pokemonList = await getPokemonList(limit);
      console.log(pokemonList);
      const pokemonListWithStats = await Promise.all(pokemonList.map(p => {
        const pokemon = getPokemon(p.name)
        return pokemon 
       }));
       pokemonListWithStats.forEach(poke => {
           poke.searchTerms = [`${poke.name}`,`${poke.name.toUpperCase()}`]
       })
      PokemonStore.update(pokemonListWithStats);  
      PokemonToShow.update(pokemonListWithStats);  
    }
    getData();
    
     },[])

  return (
    <>
    <header>
      <Header />
    </header>
    <main className={styles.mainContainer}>
      <PokemonTeam trainer={'1'}/>
      <PokemonList />
      <PokemonTeam trainer={'2'}/>
    </main>
    </>
  )
}

