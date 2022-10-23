/* eslint-disable react/prop-types */
import cn from 'classnames';
import get from 'lodash/get';
import Link from 'next/link';
import React, { useState } from 'react';

import { MEMO_STATS, MAX_POKEMON_TEAM } from '../../constants/constants';
import { PokemonSelected } from '../../store/pokemonToShow';
import { Trainer1Team, Trainer2Team } from '../../store/teamStore';
import GenericAlert from '../GenericAlert/GenericAlert';
import PokemonMovesModal from '../PokemonMovesModal/PokemonMovesModal';

import styles from './PokemonCard.module.css';

const alertDuplicatePokemonText = 'This pokemon is already in your team.';
const alertNotEnoughMoves = 'Your pokemon can learn up to 4 moves.';

export default function PokemonCard({ pokemon }) {
  const image = get(pokemon, 'sprites.other.dream_world.front_default');
  // const image = get(pokemon, 'sprites.other.official-artwork.front_default');

  const memoStats = MEMO_STATS(pokemon);

  const [selectedMoves, setSelectedMoves] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isDuplicatePokemonModal, setDuplicatePokemonModal] = useState(false);
  const [isLessMovesModal, setLessMovesModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  function getPokeWithMove(p) {
    const newPoke = {
      ...p,
      selectedMoves,
    };
    return newPoke;
  }

  function onClickAddToTeam(poke) {
    const isDisabled = selectedMoves.length !== 4;
    if (isDisabled) {
      setLessMovesModal(true);
      return;
    }
    const newPoke = getPokeWithMove(poke);
    const team1 = Trainer1Team.getValue();
    setOpenModal(false);
    if (team1.length < MAX_POKEMON_TEAM) {
      Trainer1Team.update([...team1, newPoke]);
      return;
    }
    const team2 = Trainer2Team.getValue();
    if (team2.length < MAX_POKEMON_TEAM) {
      Trainer2Team.update([...team2, newPoke]);
    }
  }

  function onClickMove(move) {
    const found = selectedMoves.some(m => m.id === move.id);
    if (found) {
      const newMoves = selectedMoves.filter(m => m.id !== move.id);
      setSelectedMoves(newMoves);
      return;
    }
    setSelectedMoves([...selectedMoves, move]);
  }

  function onClickOpenSelectPokemon() {
    setSelectedMoves([]);
    // const isT1Turn = Trainer1Turn.getValue();
    // const team = isT1Turn ? Trainer1Team.getValue() : Trainer2Team.getValue();
    // const found = team.some((el) => el.id === poke.id);
    // if (found) {
    //   setDuplicatePokemonModal(true);
    //   return;
    // }
    setOpenModal(true);
  }

  return (
    <section className={styles.pokemonCard}>
      <Link href={`pokemon/${pokemon.name}`}>
        <a className={styles.topContainer} onClick={() => PokemonSelected.update(pokemon)}>
          <img
            className={cn(styles.pokemonImage, { [styles.pokemonImageFade]: showDetails })}
            src={image}
            alt={pokemon.name}
          />
          <p className={styles.pokemonName}>{pokemon.name}</p>
        </a>
      </Link>
      <button
        type="button"
        className={cn(styles.pokemonDetails, { [styles.animation]: showDetails })}
        onClick={() => setShowDetails(!showDetails)}
      >
        <p className={styles.pokemonName}>{pokemon.name}</p>
        <div className={styles.statContainer}>
          {Object.values(memoStats).map(stat => (
            <React.Fragment key={stat.label}>
              <div className={styles.stats}>
                <p>{stat.label}</p>
                <p>{stat.value}</p>
              </div>
              <div className={styles.statsBar}>
                <div style={stat.styles} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </button>
      <div className={styles.btnContainer}>
        <button
          className={styles.actionPokemon}
          type="button"
          onClick={() => onClickOpenSelectPokemon(pokemon)}
        >
          Add to Team
        </button>
        <button
          className={styles.actionPokemon}
          type="button"
          onClick={() => setShowDetails(!showDetails)}
        >
          Details
        </button>
      </div>
      {isOpenModal
      && (
      <PokemonMovesModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setOpenModal}
        onClickMove={move => onClickMove(move)}
        onClickAddToTeam={poke => onClickAddToTeam(poke)}
        pokemon={pokemon}
        selectedMoves={selectedMoves}
      />
      )}
      {isDuplicatePokemonModal
      && (
      <GenericAlert
        isOpenModal={isDuplicatePokemonModal}
        setIsOpenModal={setDuplicatePokemonModal}
        onClickCallback={() => setDuplicatePokemonModal(false)}
      >
        {alertDuplicatePokemonText}
      </GenericAlert>
      )}
      {isLessMovesModal
      && (
      <GenericAlert
        isOpenModal={isLessMovesModal}
        setIsOpenModal={setLessMovesModal}
        onClickCallback={() => setLessMovesModal(false)}
      >
        {alertNotEnoughMoves}
      </GenericAlert>
      )}
    </section>
  );
}
