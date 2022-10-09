/* eslint-disable react/prop-types */
import React from 'react';
import get from 'lodash/get';
import { TYPE_TO_IMG } from '../../constants/constants';
import styles from './PokemonTeamCard.module.css';

export default function PokemonTeamCard({ pokemon }) {
  const pokemonImg = get(pokemon, 'sprites.front_default');
  const healthbarStyle = {
    backgroundColor: '#5ABA4A',
    width: `${((pokemon.battleStats.hpStat / pokemon.stats.hpStat) * 100).toFixed(3)}%`,
    height: '0.375rem',
    borderRadius: '0.625rem',
  };

  return (
    <div className={styles.miniCardContainer}>
      <div className={styles.detailsContainer}>
        <p className={styles.pokemonName}>{pokemon.name}</p>
        <div className={styles.statsBar}>
          <div style={healthbarStyle} />
        </div>
        {pokemon.selectedMoves.map((move) => (
          <div className={styles.moveList} key={move.name}>
            <p className={styles.moveDetails}>{move.name}</p>
            <img src={`/assets/img/${TYPE_TO_IMG[move.type.name]}`} alt="" className={styles.typeImg} />
          </div>
        ))}
      </div>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={pokemonImg} alt="pokemon in team" />
      </div>
    </div>
  );
}
