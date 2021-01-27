import {useEffect, useState} from 'react';
import PokemontoShow from '../../store/pokemonToShow';
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from './PokemonList.module.css'


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
        <div className={styles.pokemonList}>
            {pokemonList.map((pokemon) =>(
                    <PokemonCard pokemon={pokemon} key={pokemon.name}/>
            ))}
        </div>
    </section>
)
}