import {useEffect,useState} from 'react';
import {getPokemonList,getPokemon} from '../api/pokemon'
import PokemonStore from '../store/pokemonStrore'
import PokemonList from '../components/PokemonList/PokemonList';


export default function Index() {
  // useEffect(() => {
  //   const limit = 151;
  //   async function getData() {
  //     const pokemonList = await getPokemonList(limit);
  //     console.log(pokemonList);
  //     const pokemonListWithStats = await Promise.all(pokemonList.map(p => {
  //       const pokemon = getPokemon(p.name)
  //       return pokemon 
  //      }));
  //      console.log(pokemonListWithStats)
  //     PokemonStore.update(pokemonListWithStats);  
  //   }
  //   getData();
    
  //    },[])

  return (
    <>
    <header>
      navigation searchBar
    </header>
    <main>
      <PokemonList/>
    </main>
    </>
  )
}

