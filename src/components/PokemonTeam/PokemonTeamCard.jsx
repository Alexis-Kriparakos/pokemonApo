import {useEffect, useState} from 'react';
import get from 'lodash/get';
import {TYPE_TO_IMG} from '../../DummyPokemon';
import styles from './PokemonTeamCard.module.css'




export default function PokemonTeamCard({pokemon}) {
  
const pokemonImg = get(pokemon,'sprites.front_default');


return (
<div className={styles.miniCardContainer}>
    <div className={styles.detailsContainer}>
        <p className={styles.pokemonName}>{pokemon.name}</p> 
        {pokemon.selected_moves.map(move =>(
        <div className={styles.moveList} key={move.name}>
            <p className={styles.moveDetails}>{move.name}</p>
            <img src={`/assets/img/${TYPE_TO_IMG[move.type.name]}`} alt="" className={styles.typeImg}/>
        </div>
        ))}
    </div>
    <div className={styles.imgContainer}>
        <img className={styles.img} src={pokemonImg} alt="pokemon in team"/>
    </div>
</div>
)

}