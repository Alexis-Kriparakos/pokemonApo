import {useState, useEffect} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import styles from './Header.module.css';
import PokemonStore from '../../store/pokemonStrore';

export default function Header() {

    const [pokemonData,setPokemonData] = useState([])

    useState(()=>{
        const allPokemon = PokemonStore.getValue();
        const dataPokemon = cloneDeep(allPokemon);
        dataPokemon.forEach(poke => {
            poke.searchTerms = [`${poke.name}`,`${poke.name.toUpperCase()}`]
        })
        setPokemonData(dataPokemon);
    }, [])

    function onChaneInput(value) {
        const filteredPokemons = pokemonData.filter(pokemon => {
            return pokemon.searchTerms.find(term => term.indexOf(value) !== -1);
        });
        PokemonStore.update(filteredPokemons);
    }

    return(
        <section className={styles.container}>  
            <div className={styles.headerContainer}>     
                <div className={styles.headerText}>
                    Pokemon
                </div>
                <div className={styles.inputContainer}>
            <input className={styles.input} type="text" placeholder="Search Pokemon" onChange={e=>onChaneInput(e.target.value)}/>
            </div>
            </div> 
            
        </section>

    )
}