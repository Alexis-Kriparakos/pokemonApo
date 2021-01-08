import ReactModal from 'react-modal';
import {useState, useEffect} from 'react';
import get from 'lodash/get';

import styles from './PokemonMovesModal.module.css';


const TYPE_TO_IMG = {
    normal: 'normal.png',
    fire: 'fire.png',
    water: 'water.png',
    grass: 'grass.png',
    ground: 'ground.png',
    rock: 'rock.png',
    steel: 'steel.png',
    ice: 'ice.png',
    electric: 'electric.png',
    dragon: 'dragon.png',
    ghost: 'ghost.png',
    psychic: 'psychic.png',
    fighting: 'fighting.png',
    poison: 'poison.png',
    bug: 'bug.png',
    flying: 'flying.png',
    dark: 'dark.png',
    fairy: 'fairy.png',
}

const customStyles = {
    overlay: {
        position: 'fixed',
        top:0, 
        bottom: 0, 
        left: 0,
        right: 0, 
        zIndex: 9,
        background: 'rgba(0,0,0,0.3)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '0',
        transform: 'translate(-50%, -50%)',
    },
};


export default function PokemonMovesModal({isOpenModal, allPokemonMoves, onClickMove, onClickAddToTeam, pokemon,selectedMoves}) {
    const [pokemonMoves,setPokemonMoves]= useState([]);
    const isDisabled = selectedMoves.length !== 4;
    useEffect(()=>{
        setPokemonMoves(allPokemonMoves);
    },[allPokemonMoves])

    function getToolTipText(m) {
        const powerText = m.power ? `power: ${m.power}` : '';
        const accuracyText = m.accuracy ? `accuracy: ${m.accuracy}` : '';
        const typeText = `type: ${m.type.name}`;
        const statText = m.stat_changes.length ? `stat change: ${m.stat_changes[0].stat.name} 
        stat: ${m.stat_changes[0].change}` : '';
        return `
        ${powerText}
        ${accuracyText}
        ${typeText}
        ${statText}
        `
    }

    return (
        <ReactModal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
            <div className={styles.modalContainer}>
                <div className={styles.moveList}>
                {pokemonMoves.map(move=>(
                <button key={move.id} className={styles.moveBtn} onClick={() => onClickMove(move)}>
                    <div>
                        {move.name}
                        <span className={styles.tooltiptext}>
                            {getToolTipText(move)}
                        </span>
                    </div>
                    <img src={`/assets/img/${TYPE_TO_IMG[move.type.name]}`} alt="" className={styles.typeImg}/>
                    {console.log(TYPE_TO_IMG[move.type.name])}
                </button>))}
               </div>
                <div>
                <button  type='button' className={styles.btnAccept}>
                        Cancel
                    </button>
                    <button  type='button' className={styles.btnAccept} onClick={()=>onClickAddToTeam(pokemon)} disabled={isDisabled}>
                        Ok
                    </button>
                </div>
            </div>
        </ReactModal>
    );
}