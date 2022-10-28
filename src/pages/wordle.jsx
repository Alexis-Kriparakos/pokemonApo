import React, { useState, useEffect, useMemo } from 'react';

import { getPokemonList } from '../api/pokemon';
import Keyboard from '../components/Wordle/Keyboeard';
import WordleScreen from '../components/Wordle/WordleScreen';
import { KEYBOARD_BUTTONS } from '../constants/constants';
import { getRandomInt } from '../helpers/damage';

export default function Wordle({ pokemon }) {
  const [keyPressed, setKeyPressed] = useState('');
  const [pokemonWord, setPokemonWord] = useState('');
  const [winningPokemon, setWinnningPokemon] = useState();
  const [pokemonLength, setpokemonLength] = useState(0);
  const keyboard = useMemo(() => {
    const keyboardMap = KEYBOARD_BUTTONS.map(button => (
      {
        value: button,
        label: button.toUpperCase(),
        action: val => setPokemonWord(prev => prev + val),
      }
    ));
    const enterKey = {
      value: 'enter',
      label: 'ENTER',
      action: () => {},
    };
    const backSpaceKey = {
      value: 'backspace',
      label: 'BACKSPACE',
      action: () => { setPokemonWord(prev => prev.slice(0, -1)); },
    };
    keyboardMap.splice(19, 0, enterKey);
    keyboardMap.push(backSpaceKey);
    return keyboardMap;
  }, []);

  function keyDownHandler(e) {
    const keyValue = e.key.toLowerCase();
    console.log(keyboard);
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
    setPokemonWord(prev => prev + keyValue);
  }

  useEffect(() => {
    const randomIndex = getRandomInt(808);
    const pokemonSelected = pokemon[randomIndex];
    setWinnningPokemon(pokemonSelected);
    setpokemonLength(pokemonSelected.name.length);
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <section>
      <WordleScreen word={pokemonWord} winningItem={winningPokemon} length={pokemonLength} />
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
