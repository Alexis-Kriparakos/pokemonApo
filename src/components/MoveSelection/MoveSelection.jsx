/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import styles from './MoveSelection.module.css';

export default function MoveSelection({ pokemon, onClick = () => {} }) {
//   const [isMoveSelection, setIsMoveSelection] = useState(true);

  return (
    <div className={styles.movesSelection}>
      {pokemon?.selectedMoves.map((move) => (
        <button key={move.id} type="button" className={styles.moveButton} onClick={() => onClick(move)}>
          {move.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
