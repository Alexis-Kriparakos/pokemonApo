/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { TYPE_TO_IMG } from '../../DummyPokemon';
import styles from './PokemonMovesModal.module.css';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 8,
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

export default function PokemonMovesModal({
  isOpenModal, allPokemonMoves, onClickMove, onClickAddToTeam, pokemon,
}) {
  const [pokemonMoves, setPokemonMoves] = useState([]);
  useEffect(() => {
    setPokemonMoves(allPokemonMoves);
  }, [allPokemonMoves]);

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
        `;
  }

  return (
    <ReactModal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
      <div className={styles.modalContainer}>
        <div className={styles.moveList}>
          {pokemonMoves.map((move) => (
            <button key={move.id} type="button" className={styles.moveBtn} onClick={() => onClickMove(move)}>
              <div>
                {move.name}
                <span className={styles.tooltiptext}>
                  {getToolTipText(move)}
                </span>
              </div>
              <img src={`/assets/img/${TYPE_TO_IMG[move.type.name]}`} alt="" className={styles.typeImg} />
            </button>
          ))}
        </div>
        <div>
          <button type="button" className={styles.btnAccept}>
            Cancel
          </button>
          <button type="button" className={styles.btnAccept} onClick={() => onClickAddToTeam(pokemon)}>
            Ok
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
