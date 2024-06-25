import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';
import { MdRestartAlt } from 'react-icons/md';

import { TYPE_TO_IMG } from '../../constants/constants';

import styles from './wordle.module.scss';

export default function ActionBar({ tips, score, onClickRestart }) {
  const [revealImage, setRevealImage] = useState(false);
  if (isEmpty(tips)) return null;

  const { region, types, sprites } = tips;
  return (
    <div className={styles.actionBarContainer}>
      <div className={styles.actionContainer}>
        <button type="button" className={styles.restartBtn} onClick={onClickRestart}>
          <MdRestartAlt />
          <span className={styles.smallScreen}>Restart</span>
        </button>
        <p className={styles.scoreText}>{`Score: ${score}`}</p>
      </div>
      <div className={styles.tipContainer}>
        <div className={styles.tipContent}>
          <p className={styles.tipRegion}>{region}</p>
          <div className={styles.tipImageContainer}>
            {types?.map(type => (
              <img key={type} src={`/assets/img/${TYPE_TO_IMG[type]}`} alt={type} className={styles.tipImage} />
            ))}
          </div>
          <button className={styles.spriteBtn} onClick={() => setRevealImage(!revealImage)}>
            <img
              className={cn(styles.tipPokeImage, { [styles.darkImage]: !revealImage })}
              alt="pokemon"
              src={sprites.front_default}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
