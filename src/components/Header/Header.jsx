import styles from './Header.module.css';
import PokemonStore from '../../store/pokemonStrore';
import PokemonToShow from '../../store/pokemonToShow';

export default function Header() {




    function onChaneInput(value) {
        if(!value.length) {
            const allPokemon = PokemonStore.getValue();
            PokemonToShow.update(allPokemon)
            return;
        }
        const allPokemon = PokemonStore.getValue();
        const filteredPokemons = allPokemon.filter(pokemon => {
            return pokemon.searchTerms.find(term => term.indexOf(value) !== -1);
        });
        PokemonToShow.update(filteredPokemons);
    }

    return(
        <section className={styles.container}>  
            <div className={styles.headerContainer}>     
                <div className={styles.headerText}>
                    <img className={styles.logo}src="/assets/img/Pokémon_logo.png" alt=""/>
                </div>
                <div className={styles.inputContainer}>
            <input className={styles.input} type="text" placeholder="Search Pokemon" onChange={e=>onChaneInput(e.target.value)}/>
            </div>
            </div> 
            
        </section>

    )
}