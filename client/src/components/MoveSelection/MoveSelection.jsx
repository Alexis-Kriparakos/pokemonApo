/* eslint-disable react/prop-types */
import React from 'react';

import { PrimaryButton } from '../Buttons/Buttons';

import styles from './MoveSelection.module.css';

export default function MoveSelection({
  player1Moves,
  player2Moves,
  pokemon,
  status,
  onClick = () => {},
  onClickSwitch = () => {},
}) {
  const { player1, player2 } = status;
  const areMovesEnabled = (player1Moves && player1) || (player2Moves && player2);
  return (
    <div className={styles.movesSelection}>
      {pokemon?.selectedMoves.map(move => (
        <div className={styles.moveButtonContainer}>
          <PrimaryButton
            key={move.id}
            disabled={!areMovesEnabled}
            onClick={() => onClick(move)}
          >
            {move.name.toUpperCase()}
          </PrimaryButton>
        </div>
      ))}
      <PrimaryButton onClick={onClickSwitch} disabled={!areMovesEnabled}>
        SWITCH POKEMON
      </PrimaryButton>
    </div>
  );
}
