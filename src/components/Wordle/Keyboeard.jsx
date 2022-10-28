import React from 'react';

import { PrimaryButton } from '../Buttons/Buttons';

import styles from './wordle.module.scss';

export default function Keyboard({ keyboard }) {
  return (
    <div className={styles.keyboardContainer}>
      {keyboard.map(button => (
        <div key={button.value} className={styles.keyboardButton}>
          <PrimaryButton
            onClick={() => button.action(button.value)}
          >
            {button.label}
          </PrimaryButton>
        </div>
      ))}
    </div>
  );
}
