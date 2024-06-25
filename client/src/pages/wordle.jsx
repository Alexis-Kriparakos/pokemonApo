import isEmpty from 'lodash/isEmpty';
import React, { useState, useEffect } from 'react';

import { getPokemonList } from '../api/pokemon';
import Header from '../components/Header/Header';
import ActionBar from '../components/Wordle/ActionBar';
import Keyboard from '../components/Wordle/Keyboeard';
import styles from '../components/Wordle/wordle.module.scss';
import WordleScreen from '../components/Wordle/WordleScreen';
import { keyboardMemo } from '../helpers/keyboard';
import { WordleGame } from '../store/wordle';

export default function Wordle({ pokemon }) {
  const [wordleInfo, setWordleInfo] = useState({});
  const keyboard = keyboardMemo();

  function keyDownHandler(e) {
    const keyValue = e.key.toLowerCase();
    WordleGame.gameLogic(keyValue, keyboard);
  }

  function onClickRestart() {
    WordleGame.startWordle(pokemon);
    WordleGame.resetScore();
  }

  function test() {
    setTimeout(() => (
      WordleGame.startWordle(pokemon)
    ), 2000);
  }

  useEffect(() => {
    WordleGame.startWordle(pokemon);
    const wordleGame$ = WordleGame.subscribe(info => {
      setWordleInfo(info);
      console.log('isGameWon', info.isGameWon, 'isGameOver', info.isGameOver);
      if (info.isGameOver) {
        test();
        return;
      }
      if (info.isGameWon) {
        test();
      }
    });
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      wordleGame$.unsubscribe();
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  if (isEmpty(wordleInfo)) return null;
  const { tips, score } = wordleInfo;

  return (
    <>
      <Header />
      <section className={styles.container}>
        <ActionBar tips={tips} score={score} onClickRestart={onClickRestart} />
        <WordleScreen gameInfo={wordleInfo} />
        <Keyboard keyboard={keyboard} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [pokemon] = await Promise.all([
    getPokemonList(386),
  ]);
  return {
    props: {
      pokemon,
    },
  };
}
