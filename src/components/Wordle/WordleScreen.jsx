import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import ActionBar from './ActionBar';
import styles from './wordle.module.scss';

function Row({ lengthWord, _try }) {
  return (
    <div className={styles.rowContainer}>
      {lengthWord.map((val, index) => (
        <div
          key={val}
          className={cn(
            styles.letterContainer,
            {
              [styles.correctPosition]: _try.comparedStrings[index] === 'Matched',
              [styles.correctLetter]: _try.comparedStrings[index] === 'Included',
              [styles.wrongLetter]: _try.comparedStrings[index] === 'Unmatched',
            }
          )}
        >
          <div className={styles.letter}>{_try?.wordTyped[index]}</div>
        </div>
      ))}
    </div>
  );
}

export default function WordleScreen({ gameInfo }) {
  if (!gameInfo || isEmpty(gameInfo.tries)) return null;
  const { wordLength, tries, tips } = gameInfo;

  const lengthWord = [...Array.from(Array(wordLength).keys())];

  return (
    <div className={styles.screenContainer}>
      <ActionBar tips={tips} />
      {tries.map(_try => (
        <Row key={_try.id} lengthWord={lengthWord} _try={_try} />
      ))}
    </div>
  );
}
