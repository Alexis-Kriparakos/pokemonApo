/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import ReactModal from 'react-modal';
import { PrimaryButton } from '../Buttons/Buttons';
import { getPokemonMove } from '../../api/pokemon';
import { TYPE_TO_IMG } from '../../constants/constants';
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
  isOpenModal,
  setIsOpenModal,
  onClickMove,
  onClickAddToTeam,
  pokemon,
  selectedMoves,
}) {
  const [pokemonMoves, setPokemonMoves] = useState([]);

  useEffect(() => {
    async function getPokemonMoves() {
      await Promise.all(pokemon.moves.map(async (move) => {
        const pokemonM = await getPokemonMove(move.move.url);
        setPokemonMoves((prevS) => [...prevS, {
          id: pokemonM.id,
          name: pokemonM.name,
          effect_chance: pokemonM.effect_chance,
          effect_changes: pokemonM.effect_changes,
          effect_entries: pokemonM.effect_entries,
          accuracy: pokemonM.accuracy,
          power: pokemonM.power,
          stat_changes: pokemonM.stat_changes,
          target: pokemonM.target,
          type: pokemonM.type,
        }]);
        return pokemonM;
      }));
    }
    getPokemonMoves();
  }, []);

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

  function isMoveSelected(move) {
    return selectedMoves.some((m) => m.id === move.id);
  }

  return (
    <ReactModal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
      <div className={styles.modalContainer}>
        <div className={styles.moveList}>
          {pokemonMoves.map((move) => (
            <button
              key={move.id}
              type="button"
              className={cn(styles.moveBtn, { [styles.moveBtnSelected]: isMoveSelected(move) })}
              onClick={() => onClickMove(move)}
            >
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
        <div className={styles.spacingBtn}>
          <PrimaryButton onClick={() => onClickAddToTeam(pokemon)}>
            Ok
          </PrimaryButton>
        </div>
        <PrimaryButton onClick={() => setIsOpenModal(false)}>
          Cancel
        </PrimaryButton>
      </div>
    </ReactModal>
  );
}
