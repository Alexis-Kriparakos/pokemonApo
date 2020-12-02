import styles from './PokemonCard.module.css';

export default function PokemonCard({pokemon}) {
    return (
        <div className={styles.pokemonCard}>
            <img className={styles.pokemonImage} src={pokemon.image} alt={pokemon.name}/>
           <p className={styles.pokemonName}>{pokemon.name}</p>
           <button className={styles.addPokemon}>Add to Team</button>
        </div>
    )
}

