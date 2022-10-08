/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import cn from 'classnames';
import { getPokemonMove } from '../../api/pokemon';
import { Trainer1Turn, Trainer1Team, Trainer2Team } from '../../store/pokemonBattle';
import { MAX_STATS } from '../../DummyPokemon';
import GenericAlert from '../GenericAlert/GenericAlert';
import PokemonMovesModal from '../PokemonMovesModal/PokemonMovesModal';
import styles from './PokemonCard.module.css';

const alertDuplicatePokemonText = 'This pokemon is already in your team.';
const alertNotEnoughMoves = 'Your pokemon can learn up to 4 moves.';
const MAX_POKEMON_TEAM = 5;

export default function PokemonCard({ pokemon }) {
  const image = get(pokemon, 'sprites.other.dream_world.front_default');

  const hpStat = Math.ceil(get(pokemon, 'stats[0].base_stat') * 4.5);
  const atkStat = Math.ceil(get(pokemon, 'stats[1].base_stat') * 3.2);
  const defStat = Math.ceil(get(pokemon, 'stats[2].base_stat') * 3.2);
  const spAtkStat = Math.ceil(get(pokemon, 'stats[3].base_stat') * 3.2);
  const spDefStat = Math.ceil(get(pokemon, 'stats[4].base_stat') * 3.5);
  const speedStat = Math.ceil(get(pokemon, 'stats[5].base_stat') * 3);

  const BAR_STYLE = {
    hp: {
      backgroundColor: '#5ABA4A',
      width: `${((hpStat / MAX_STATS.HP_STAT) * 100).toFixed(3)}%`,
      height: '0.375rem',
      borderRadius: '0.625rem',
    },
    atk: {
      backgroundColor: '#F37336',
      width: `${((atkStat / MAX_STATS.ATK_STAT) * 100).toFixed(3)}%`,
      height: '0.375rem',
      borderRadius: '0.625rem',
    },
    def: {
      backgroundColor: '#63C8F2',
      width: `${((defStat / MAX_STATS.DEF_STAT) * 100).toFixed(3)}%`,
      height: '0.375rem',
      borderRadius: ' 0.625rem',
    },
    spAtk: {
      backgroundColor: '#D88DBC',
      width: `${((spAtkStat / MAX_STATS.SPATK_STAT) * 100).toFixed(3)}%`,
      height: '0.375rem',
      borderRadius: '0.625rem',
    },
    spDef: {
      backgroundColor: '#1E3E72',
      width: `${((spDefStat / MAX_STATS.SPDEF_STAT) * 100).toFixed(3)}%`,
      height: '0.375rem',
      borderRadius: '0.625rem',
    },
    speed: {
      backgroundColor: '#F7CC3B',
      width: `${((speedStat / MAX_STATS.SPEED_STAT) * 100).toFixed(3)}%`,
      height: '0.375rem',
      borderRadius: '0.625rem',
    },
  };

  const [allPokemonMoves, setAllPokemonMoves] = useState([]);
  const [selectedMoves, setSelectedMoves] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isDuplicatePokemonModal, setDuplicatePokemonModal] = useState(false);
  const [isLessMovesModal, setLessMovesModal] = useState(false);

  function getPokeWithMove(p) {
    const newPoke = { ...p, selected_moves: selectedMoves };
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
      Trainer1Turn.update(true);
      return;
    }
    const team2 = Trainer2Team.getValue();
    if (team2.length < MAX_POKEMON_TEAM) {
      Trainer2Team.update([...team2, newPoke]);
      Trainer1Turn.update(false);
    }
  }

  function onClickMove(move) {
    const found = selectedMoves.some((m) => m.id === move.id);
    console.log(found, 'move', move);
    if (found) {
      const newMoves = selectedMoves.filter((m) => m.id !== move.id);
      setSelectedMoves(newMoves);
      return;
    }
    setSelectedMoves([...selectedMoves, move]);
  }

  function onClickOpenSelectPokemon(poke) {
    setSelectedMoves([]);
    const isT1Turn = Trainer1Turn.getValue();
    const team = isT1Turn ? Trainer1Team.getValue() : Trainer2Team.getValue();
    const found = team.some((el) => el.id === poke.id);
    if (found) {
      setDuplicatePokemonModal(true);
      return;
    }
    setOpenModal(true);
  }

  function onClickRemoveFromTeam(poke) {
    const team1 = Trainer1Team.getValue();
    if (team1.length < MAX_POKEMON_TEAM) {
      const newTeam1 = team1.filter((p) => p.id !== poke.id);
      Trainer1Team.update(newTeam1);
      return;
    }
    const team2 = Trainer2Team.getValue();
    const newTeam2 = team2.filter((p) => p.id !== poke.id);
    Trainer2Team.update(newTeam2);
  }

  useEffect(() => {
    async function getPokemonMoves() {
      await Promise.all(pokemon.moves.map(async (move) => {
        const pokemonM = await getPokemonMove(move.move.url);
        setAllPokemonMoves((prevS) => [...prevS, {
          id: pokemonM.id,
          name: pokemonM.name,
          effect_chance: pokemonM.effect_chance,
          effect_changes: pokemonM.effect_changes,
          effect_entries: pokemonM.effect_entries,
          accuracy: pokemonM.accuracy,
          power: pokemonM.power,
          stat_changes: pokemonM.stat_changes,
          target: pokemonM.target,
          type: pokemonM.type,
        }]);
        return pokemonM;
      }));
    }
    getPokemonMoves();
  }, []);

  return (
    <section className={styles.pokemonCard}>
      <div className={styles.topContainer}>
        <img className={styles.pokemonImage} src={image} alt={pokemon.name} />
        <p className={styles.pokemonName}>{pokemon.name}</p>
        <div className={styles.pokemonDetails}>
          <p className={styles.pokemonName}>{pokemon.name}</p>
          <div className={styles.statContainer}>
            <div className={styles.stats}>
              <p>HP : </p>
              <p>{hpStat}</p>
            </div>
            <div className={cn(styles.statsBar)}>
              <div style={BAR_STYLE.hp} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={styles.stats}>
              <p>Attack : </p>
              <p>{atkStat}</p>
            </div>
            <div className={cn(styles.statsBar)}>
              <div style={BAR_STYLE.atk} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={styles.stats}>
              <p>Defense : </p>
              <p>{defStat}</p>
            </div>
            <div className={cn(styles.statsBar)}>
              <div style={BAR_STYLE.def} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={styles.stats}>
              <p>Sp. Atk : </p>
              <p>{spAtkStat}</p>
            </div>
            <div className={cn(styles.statsBar)}>
              <div style={BAR_STYLE.spAtk} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={styles.stats}>
              <p>Sp. Def : </p>
              <p>{spDefStat}</p>
            </div>
            <div className={cn(styles.statsBar)}>
              <div style={BAR_STYLE.spDef} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={styles.stats}>
              <p>Speed : </p>
              <p>{speedStat}</p>
            </div>
            <div className={cn(styles.statsBar)}>
              <div style={BAR_STYLE.speed} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.addPokemon}
          type="button"
          onClick={() => onClickOpenSelectPokemon(pokemon)}
        >
          Add to Team
        </button>
        <button
          className={styles.addPokemon}
          type="button"
          onClick={() => onClickRemoveFromTeam(pokemon)}
        >
          Remove

        </button>
      </div>
      {isOpenModal
      && (
      <PokemonMovesModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setOpenModal}
        allPokemonMoves={allPokemonMoves}
        onClickMove={(move) => onClickMove(move)}
        onClickAddToTeam={(poke) => onClickAddToTeam(poke)}
        pokemon={pokemon}
        selectedMoves={selectedMoves}
      />
      )}
      {isDuplicatePokemonModal
      && (
      <GenericAlert
        isOpenModal={isDuplicatePokemonModal}
        alertText={alertDuplicatePokemonText}
        onClickCallback={() => setDuplicatePokemonModal(false)}
      />
      )}
      {isLessMovesModal
      && (
      <GenericAlert
        isOpenModal={isLessMovesModal}
        alertText={alertNotEnoughMoves}
        onClickCallback={() => setLessMovesModal(false)}
      />
      )}
    </section>
  );
}
