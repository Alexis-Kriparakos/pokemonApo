import {useEffect, useState} from 'react';
import PokemontoShow from '../../store/pokemonToShow';
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from './PokemonList.module.css'

import {DUMMY_POKEMON} from '../../DummyPokemon';

export default function PokemonList() {
  const [pokemonList,setPokemonList] = useState([]);

  useEffect(()=>{
    const pokemontoShow$ = PokemontoShow.subscribe(setPokemonList);

    return()=>{
        pokemontoShow$.unsubscribe();
    }
  },[])

  if(!pokemonList.length) return null;

return (
    <section className={styles.container}>
        <ul className={styles.pokemonList}>
            {pokemonList.map((pokemon,i) =>(
                <li className={styles.pokemonListItem} key={i}>
                    <PokemonCard pokemon={pokemon} />
                </li>
            ))}
        </ul>
    </section>
)
}