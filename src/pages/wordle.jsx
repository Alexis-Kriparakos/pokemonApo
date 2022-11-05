import React, { useState, useEffect, useMemo } from 'react';

import { getPokemonList } from '../api/pokemon';
import Header from '../components/Header/Header';
import Keyboard from '../components/Wordle/Keyboeard';
import styles from '../components/Wordle/wordle.module.scss';
import WordleScreen from '../components/Wordle/WordleScreen';
import { KEYBOARD_BUTTONS } from '../constants/constants';
import { WordleGame } from '../store/wordle';

export default function Wordle({ pokemon }) {
  const [wordleInfo, setWordleInfo] = useState({});
  const keyboard = useMemo(() => {
    const keyboardMap = KEYBOARD_BUTTONS.map(button => (
      {
        value: button,
        label: button.toUpperCase(),
        action: () => {
          if (WordleGame.lettersInWordReached()) return;
          WordleGame.onUpdateWordTyped(button);
        },
      }
    ));
    const enterKey = {
      value: 'enter',
      label: 'ENTER',
      action: WordleGame.onPressEnter,
    };
    const backSpaceKey = {
      value: 'backspace',
      label: 'BACKSPACE',
      action: WordleGame.onPressBackSpace,
    };
    keyboardMap.splice(19, 0, enterKey);
    keyboardMap.push(backSpaceKey);
    return keyboardMap;
  }, []);

  function keyDownHandler(e) {
    const keyValue = e.key.toLowerCase();
    const isValidKeyPress = keyboard.some(key => (key.value === keyValue));
    if (!isValidKeyPress) return console.log('NOT VALID KEYPRESS');
    if (keyValue === 'backspace') {
      const backSpaceKey = keyboard.find(key => key.value === 'backspace');
      backSpaceKey.action();
      return;
    }
    if (keyValue === 'enter') {
      const enterKey = keyboard.find(key => key.value === 'enter');
      enterKey.action();
      return;
    }
    if (WordleGame.lettersInWordReached()) return;
    WordleGame.onUpdateWordTyped(keyValue);
  }

  useEffect(() => {
    WordleGame.startWordle(pokemon);
    const wordleGame$ = WordleGame.subscribe(setWordleInfo);
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      wordleGame$.unsubscribe();
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <section className={styles.container}>
        <WordleScreen gameInfo={wordleInfo} />
        <Keyboard keyboard={keyboard} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [pokemon] = await Promise.all([
    getPokemonList(808),
  ]);
  return {
    props: {
      pokemon,
    },
  };
}
