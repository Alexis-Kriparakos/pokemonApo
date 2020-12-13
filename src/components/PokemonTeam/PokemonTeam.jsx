import {useEffect, useState} from 'react';
import {Trainer1Team,Trainer2Team} from '../../store/pokemonBattle';
import styles from './PokemonTeam.module.css'

export default function PokemonTeam({trainer}) {

    const [pokemonInTeam,setPokemoninTeam] = useState([]);
  
    useEffect(()=>{
        if(trainer === '1') {
            const team$ = Trainer1Team.subscribe(setPokemoninTeam);
            return()=>{
                team$.unsubscribe();
            }
        } else {
            const team$ = Trainer2Team.subscribe(setPokemoninTeam);
            return()=>{
                team$.unsubscribe();
            }
        }
},[])

return (
    <section >
       <header>
           <div>
               <p>player Name</p>
               <img src="" alt="Player icon"/>             
            </div>
            <div>
                <p>Remaing Pokemon</p>
                <p>{pokemonInTeam.length} / 5</p>
            </div>
       </header>
       <main>
           {pokemonInTeam.lenght !==0 &&<ul>
               {pokemonInTeam.map(pokemon => (
                   <>
                   <div>{pokemon.name}</div>
                 
                   </>
                //    <PokemonTeamCard pokemon={pokemon}/> 
               ))}
           </ul>}
       </main>
    </section>
)
}