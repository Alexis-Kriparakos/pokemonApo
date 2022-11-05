import Link from 'next/link';
import React from 'react';

import Header from '../components/Header/Header';
import { GAME_MODES } from '../constants/constants';

import styles from './index.module.scss';

export default function index() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        {GAME_MODES.map(mode => (
          <Link href={mode.link}>
            <a className={styles.link}>{mode.label}</a>
          </Link>
        ))}
      </div>
    </>
  );
}
