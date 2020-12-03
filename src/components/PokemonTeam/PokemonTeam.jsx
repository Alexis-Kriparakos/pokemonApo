import {useEffect, useState} from 'react';
import PokemonStore from '../../store/pokemonStrore';
import styles from './PokemonTeam.module.css'
import {DUMMY_POKEMON} from '../../DummyPokemon';

export default function PokemonTeam() {
  
const pokemonInTeam = []



return (
    <section >
       <header>
           <div>
               <p>player Name</p>
               <img src="" alt="Player icon"/>             
            </div>
            <div>
                <p>Remaing Pokemon</p>
                <p>4 / 5</p>
            </div>
       </header>
       <main>
           <ul>
               {pokemonInTeam.map(pokemon => (
                   <PokemonTeamCard pokemon={pokemon}/> 
               ))}
           </ul>
       </main>
    </section>
)
}