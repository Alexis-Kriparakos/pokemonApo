import get from 'lodash/get';
import { useEffect, useState } from 'react';
import {getPokemonMove} from '../../api/pokemon';
import {Trainer1Turn,Trainer1Team,Trainer2Team} from '../../store/pokemonBattle';

import GenericAlert from '../GenericAlert/GenericAlert';
import PokemonMovesModal from '../PokemonMovesModal/PokemonMovesModal';
import styles from './PokemonCard.module.css';

export default function PokemonCard({pokemon}) {
    const image = get(pokemon, 'sprites.other.dream_world.front_default');
    const alertText = 'This pokemon is already in your team';
    const [allPokemonMoves,setAllPokemonMoves] = useState([]);
    const [selectedMoves,setSelectedMoves] = useState([]);
    const [isOpenModal, setOpenModal] = useState(false);
    const [isAlertModalOpen, setAlertModalOpen] = useState(false);

    function onClickAddToTeam(poke) {
        const newPoke = getPokeWithMove(poke)
        const team1 = Trainer1Team.getValue();
        setOpenModal(false)
        if(team1.length < 5) {
            Trainer1Team.update([...team1,newPoke]);
            Trainer1Turn.update(true);
            return;
        }
        const team2 = Trainer2Team.getValue();
        if(team2.length < 5) {
            Trainer2Team.update([...team2,newPoke]);
            Trainer1Turn.update(false);
        }
    }

    function onClickMove(m){
        const found = selectedMoves.some(el => el.id === m.id);
        if(found) {
            const newMoves = selectedMoves.filter(el=> el.id !== m.id);
            setSelectedMoves(newMoves);
            return;
        }
        if(selectedMoves.length === 4) return;
        setSelectedMoves([...selectedMoves, m])
    }

    function getPokeWithMove(p){
        const newPoke = {...p, selected_moves: selectedMoves};
        return newPoke;
    }

    function onClickOpenSelectPokemon(poke) {
        const isT1Turn = Trainer1Turn.getValue();
        const team = isT1Turn ? Trainer1Team.getValue() : Trainer2Team.getValue();
        const found = team.some(el => el.id === poke.id);
        if(found){
            setAlertModalOpen(true);
            return;
        }
        setOpenModal(true);
    }

    function onClickRemoveFromTeam(poke) {
        const team1 = Trainer1Team.getValue();
        if(team1.length < 5) {
        const newTeam1 = team1.filter(p => p.id !== poke.id);
        Trainer1Team.update(newTeam1);
        return;
        }
        const team2 = Trainer2Team.getValue();
        const newTeam2 = team2.filter(p=> p.id !== poke.id);
        Trainer2Team.update(newTeam2);
    }

    useEffect(()=>{
        async function getPokemonMoves() {
        await Promise.all(pokemon.moves.map(async move => {
            const pokemonM = await getPokemonMove(move.move.url);
            setAllPokemonMoves(prevS => [...prevS,{
                id: pokemonM.id,
                name: pokemonM.name,
                effect_chance: pokemonM.effect_chance,
                effect_changes: pokemonM.effect_changes,
                effect_entries: pokemonM.effect_entries,
                accuracy: pokemonM.accuracy,
                power: pokemonM.power,
                stat_changes: pokemonM.stat_changes,
                target: pokemonM.target,
                type: pokemonM.type
            }]);    
            return pokemonM 
           }));
        }
        getPokemonMoves();
    },[])

    return (
        <section className={styles.pokemonCard}>
            <img className={styles.pokemonImage} src={image} alt={pokemon.name}/>
           <p className={styles.pokemonName}>{pokemon.name}</p>
           <div className={styles.btnContainer}>
           <button className={styles.addPokemon} onClick={()=> onClickOpenSelectPokemon(pokemon)}>Add to Team</button>
           <button className={styles.addPokemon} onClick={()=> onClickRemoveFromTeam(pokemon)}>Remove</button>
           </div>
           {isOpenModal && <PokemonMovesModal isOpenModal={isOpenModal} allPokemonMoves={allPokemonMoves} onClickMove={onClickMove} onClickAddToTeam={onClickAddToTeam} pokemon={pokemon} selectedMoves={selectedMoves}/>}
           {isAlertModalOpen && <GenericAlert isOpenModal={isAlertModalOpen} alertText={alertText} onClickCallback={()=> setAlertModalOpen(false)}/>}
           
        </section>
    )
}

