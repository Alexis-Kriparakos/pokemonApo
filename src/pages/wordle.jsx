import React, { useState, useEffect, useMemo } from 'react';

import { getPokemonList } from '../api/pokemon';
import Keyboard from '../components/Wordle/Keyboeard';
import { KEYBOARD_BUTTONS } from '../constants/constants';

export default function Wordle({ pokemon }) {
  const [keyPressed, setKeyPressed] = useState('');
  const [pokemonWord, setPokemonWord] = useState('');

  const keyboard = useMemo(() => {
    const keyboardMap = KEYBOARD_BUTTONS.map(button => (
      {
        value: button,
        label: button.toUpperCase(),
        action: val => setPokemonWord(prev => prev + val),
      }
    ));
    const enterKey = {
      value: 'Enter',
      label: 'ENTER',
      action: () => {},
    };
    const backSpaceKey = {
      value: 'Backspace',
      label: 'BACKSPACE',
      action: () => {},
    };
    keyboardMap.splice(19, 0, enterKey);
    keyboardMap.push(backSpaceKey);
    return keyboardMap;
  }, []);

  function keyDownHandler(e) {
    const keyValue = e.key.toLowerCase();
    const isValidKeyPress = keyboard.some(key => (key.value === keyValue));
    if (!isValidKeyPress) return console.log('NOT VALID KEYPRESS');
    console.log('key', keyValue);
    setPokemonWord(prev => prev + keyValue);
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <section>
      <Keyboard
        keyboard={keyboard}
        setKeyPressed={setKeyPressed}
      />
    </section>
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
