/* eslint-disable react/prop-types */
import React from 'react';

import styles from './MoveSelection.module.css';

export default function MoveSelection({ pokemon, onClick = () => {}, isDisabled }) {
  return (
    <div className={styles.movesSelection}>
      {pokemon?.selectedMoves.map((move) => (
        <button
          key={move.id}
          type="button"
          className={styles.moveButton}
          onClick={() => onClick(move)}
          disabled={isDisabled}
        >
          {move.name.toUpperCase()}
        </button>
      ))}
      <button type="button">
        SWITCH POKEMON
      </button>
    </div>
  );
}
