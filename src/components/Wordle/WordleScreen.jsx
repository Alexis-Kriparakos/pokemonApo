import React, { useCallback } from 'react';

import { MAX_WORDLE_TRIES } from '../../constants/constants';

import styles from './wordle.module.scss';

export default function WordleScreen({ winningItem, word, length }) {
  function onChangeLetter() {
    return null;
  }

  const Row = useCallback(() => {
    const wordLength = [...Array(length)];
    return (
      <div className={styles.rowContainer}>
        {wordLength.map((_, index) => (
          <div className={styles.letterContainer}>
            <div className={styles.letter}>{word[index]}</div>
          </div>
        ))}
      </div>
    );
  }, [word]);

  return (
    <div className={styles.screenContainer}>
      {[...Array(MAX_WORDLE_TRIES)].map((_, index) => <Row key={index}/>)}
    </div>
  );
}
