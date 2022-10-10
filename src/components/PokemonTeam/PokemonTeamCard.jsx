/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';
import get from 'lodash/get';
import { TYPE_TO_IMG } from '../../constants/constants';
import styles from './PokemonTeamCard.module.css';

export default function PokemonTeamCard({ pokemon, onClick }) {
  const [currentPokemon, setCurrentPokemon] = useState(pokemon);

  const pokemonImg = get(pokemon, 'sprites.front_default');
  const healthbarStyle = {
    backgroundColor: '#5ABA4A',
    width: `${((currentPokemon.battleStats.hpStat / currentPokemon.stats.hpStat) * 100).toFixed(3)}%`,
    height: '0.375rem',
    borderRadius: '0.625rem',
  };

  useEffect(() => {
    setCurrentPokemon(pokemon);
  }, [pokemon]);

  if (!pokemon) return null;
  return (
    <div className={styles.container}>
      <button type="button" className={styles.miniCardContainer} onClick={() => onClick(currentPokemon)}>
        <div className={styles.detailsContainer}>
          <p className={styles.pokemonName}>{currentPokemon.name}</p>
          <div className={styles.statsBar}>
            <div style={healthbarStyle} />
          </div>
          {currentPokemon.selectedMoves.map((move) => (
            <div className={styles.moveList} key={move.name}>
              <p className={styles.moveDetails}>{move.name}</p>
              <img src={`/assets/img/${TYPE_TO_IMG[move.type.name]}`} alt="" className={styles.typeImg} />
            </div>
          ))}
        </div>
        <div className={styles.rightContainer}>
          <img className={styles.img} src={pokemonImg} alt="pokemon in team" />
        </div>
      </button>
      <button type="button" className={styles.removeBtn}>
        <MdRemoveCircleOutline className={styles.icon} />
      </button>
    </div>
  );
}
