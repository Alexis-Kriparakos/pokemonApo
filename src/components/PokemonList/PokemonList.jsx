import {useEffect, useState} from 'react';
import PokemonStore from '../../store/pokemonStrore';
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from './PokemonList.module.css'

import {DUMMY_POKEMON} from '../../DummyPokemon';

export default function PokemonList() {
  const [pokemonList,setPokemonList] = useState(DUMMY_POKEMON);

//   useEffect(()=>{
//       const pokemonStore$ = PokemonStore.subscribe(setPokemonList);
//     return()=>{
//         pokemonStore$.unsubscribe();
//     }
//   },[])

  if(!pokemonList.length) return null;

return (
    <section >
        <ul className={styles.pokemonList}>
            {pokemonList.map(pokemon =>(
                <li className={styles.pokemonListItem}>
                    <PokemonCard pokemon={pokemon} />
                </li>
            ))}
        </ul>
    </section>
)
}