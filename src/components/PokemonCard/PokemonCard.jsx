import get from 'lodash/get';
import styles from './PokemonCard.module.css';

export default function PokemonCard({pokemon}) {
    const image = get(pokemon, 'sprites.other.dream_world.front_default');
    return (
        <div className={styles.pokemonCard}>
            <img className={styles.pokemonImage} src={image} alt={pokemon.name}/>
           <p className={styles.pokemonName}>{pokemon.name}</p>
           <button className={styles.addPokemon}>Add to Team</button>
        </div>
    )
}

