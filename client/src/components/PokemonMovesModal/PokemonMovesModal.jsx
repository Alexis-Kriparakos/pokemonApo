/* eslint-disable react/prop-types */
import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import ReactModal from 'react-modal';

import { TYPE_TO_IMG } from '../../constants/constants';
import { getPokemonMoves } from '../../helpers/pokemon';
import { PrimaryButton } from '../Buttons/Buttons';
import Loader from '../Loader';

import styles from './PokemonMovesModal.module.scss';

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
  const [isFetching, setIsFetching] = useState(false);

  const headerTitle = `Pick ${pokemon.name}'s 4 Moves`;

  async function getMoves() {
    setIsFetching(true);
    const allMoves = await getPokemonMoves(pokemon);
    setPokemonMoves(allMoves);
    setIsFetching(false);
  }

  useEffect(() => {
    getMoves();
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
    return selectedMoves.some(m => m.id === move.id);
  }

  return (
    <ReactModal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
      <div className={styles.modalContainer}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>{headerTitle}</h1>
          <button type="button" className={styles.closeButton} onClick={() => setIsOpenModal(!isOpenModal)}>
            <MdClose className={styles.closeImage} />
          </button>
        </header>
        {!isFetching && pokemonMoves.length !== 0 ? (
          <main className={styles.moveList}>
            {pokemonMoves.map(move => (
              <div
                key={move.id}
                className={cn(
                  styles.moveBtnContainer,
                  { [styles.moveSelected]: isMoveSelected(move) }
                )}
              >
                <PrimaryButton
                  onClick={() => onClickMove(move)}
                >
                  <div className={styles.content} title={getToolTipText(move)}>
                    {move.name}
                    {/* <span className={styles.tooltiptext}> */}
                    {/* {getToolTipText(move)} */}
                    {/* </span> */}
                    <img src={`/assets/img/${TYPE_TO_IMG[move.type.name]}`} alt="" className={styles.typeImg} />
                  </div>
                </PrimaryButton>
              </div>
            ))}
          </main>
        )
          : <div className={styles.loaderContainer}><Loader /></div>}
        <footer className={styles.buttonContainer}>
          <div className={styles.spacingBtn}>
            <PrimaryButton onClick={() => setIsOpenModal(false)}>
              Cancel
            </PrimaryButton>
          </div>
          <div className={styles.spacingBtn}>
            <PrimaryButton onClick={() => onClickAddToTeam(pokemon)}>
              Ok
            </PrimaryButton>
          </div>
        </footer>
      </div>
    </ReactModal>
  );
}
