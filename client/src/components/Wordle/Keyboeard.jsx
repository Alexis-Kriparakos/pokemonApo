import React from 'react';
import { FaBackspace } from 'react-icons/fa';

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
            {/* {button.label} */}
            {button.value === 'backspace' ? <FaBackspace /> : button.label}
          </SecondaryButton>
        </div>
      ))}
    </div>
  );
}
