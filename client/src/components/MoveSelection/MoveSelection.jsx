/* eslint-disable react/prop-types */
import React from 'react';

import { PrimaryButton } from '../Buttons/Buttons';

import styles from './MoveSelection.module.css';

export default function MoveSelection({
  pokemon,
  onClick = () => {},
  onClickSwitch = () => {},
  isDisabled = false,
}) {
  return (
    <div className={styles.movesSelection}>
      {pokemon?.selectedMoves.map(move => (
        <div className={styles.moveButtonContainer}>
          <PrimaryButton
            key={move.id}
            disabled={isDisabled}
            onClick={() => onClick(move)}
          >
            {move.name.toUpperCase()}
          </PrimaryButton>
        </div>
      ))}
      <PrimaryButton onClick={onClickSwitch} disabled={isDisabled}>
        SWITCH POKEMON
      </PrimaryButton>
    </div>
  );
}
