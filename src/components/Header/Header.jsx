import {useState, useEffect} from 'react';
import {DUMMY_POKEMON} from '../../DummyPokemon';
import cloneDeep from 'lodash/cloneDeep';
import styles from './Header.module.css';


export default function Header() {

    const [pokemonsFiltered,setPokemonFiltered] = useState([]);
    const [pokemonData,setPokemonData] = useState([])

    useState(()=>{
        const dataPokemon = cloneDeep(DUMMY_POKEMON);
        dataPokemon.forEach(poke => {
            poke.searchTerms = [`${poke.name}`,`${poke.name.toUpperCase()}`]
        })
        setPokemonData(dataPokemon);
    }, [DUMMY_POKEMON])

    function onChaneInput(value) {
        const filteredPokemons = pokemonData.filter(pokemon => {
            return pokemon.searchTerms.find(term => term.indexOf(value) !== -1);
        });
        console.log(pokemonData)
        console.log(filteredPokemons);
        setPokemonFiltered(filteredPokemons);
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