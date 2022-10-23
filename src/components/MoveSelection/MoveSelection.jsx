/* eslint-disable react/prop-types */
import React from 'react';

import { PrimaryButton } from '../Buttons/Buttons';

import styles from './MoveSelection.module.css';

export default function MoveSelection({ pokemon, onClick = () => {}, isDisabled }) {
  return (
    <div className={styles.movesSelection}>
      {pokemon?.selectedMoves.map(move => (
        <div className={styles.moveButtonContainer}>
          <PrimaryButton
            key={move.id}
            onClick={() => onClick(move)}
            disabled={isDisabled}
          >
            {move.name.toUpperCase()}
          </PrimaryButton>
        </div>
      ))}
      <PrimaryButton disabled={isDisabled}>
        SWITCH POKEMON
      </PrimaryButton>
    </div>
  );
}
