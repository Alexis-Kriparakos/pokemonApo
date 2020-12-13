import get from 'lodash/get';
import {PokemonBattle,Trainer1Turn,Trainer1Team,Trainer2Team} from '../../store/pokemonBattle';
import styles from './PokemonCard.module.css';

export default function PokemonCard({pokemon}) {
    const image = get(pokemon, 'sprites.other.dream_world.front_default');

    function onClickAddToTeam(poke) {
        const trainer1Turn = Trainer1Turn.getValue();
        if(trainer1Turn){
            const team1 = Trainer1Team.getValue();
            if(team1.length <= 5) {
                Trainer1Team.update([...team1,poke]);
                Trainer1Turn.update(false);
                return;
            }
        }           
         const team2 = Trainer2Team.getValue();
        if(team2.length <= 5) {
            Trainer2Team.update([...team2,poke]);
            Trainer1Turn.update(true);
        }
    }

    return (
        <div className={styles.pokemonCard}>
            <img className={styles.pokemonImage} src={image} alt={pokemon.name}/>
           <p className={styles.pokemonName}>{pokemon.name}</p>
           <button className={styles.addPokemon} onClick={()=>onClickAddToTeam(pokemon)}>Add to Team</button>
        </div>
    )
}

