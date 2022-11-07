import React from 'react';

import { SecondaryButton } from '../Buttons/Buttons';

import styles from './wordle.module.scss';

export default function Keyboard({ keyboard }) {
  return (
    <div className={styles.keyboardContainer}>
      {keyboard.map(button => (
        <div key={button.value} className={styles.keyboardButton}>
          <SecondaryButton
            onClick={() => button.action(button.value)}
          >
            {button.label}
          </SecondaryButton>
        </div>
      ))}
    </div>
  );
}
