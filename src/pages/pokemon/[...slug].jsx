// import orderBy from 'lodash/orderBy';

import orderBy from 'lodash/orderBy';
import React, { useState, useMemo } from 'react';

import { getPokemonSpecies, getPokemonEvolutionChain, getPokemon } from '../../api/pokemon';
import { PrimaryButton } from '../../components/Buttons/Buttons';
import Header from '../../components/Header/Header';
import { MAX_STATS, TYPE_TO_IMG, DUMMY_TEXT } from '../../constants/constants';
import { getPokemonMoves } from '../../helpers/pokemonWithMoves';
import { transformPokemon } from '../../helpers/transformer';

import styles from './pokemonDetails.module.css';

export default function PokemonPage({ _pokemon, _evolutionChain }) {
  const pokemon = JSON.parse(_pokemon);
  const evolutionChain = JSON.parse(_evolutionChain);

  function getMostPowerfullMoves() {
    const sortedMoves = orderBy(pokemon.moves, ({ power }) => power || 0, 'desc');
    return sortedMoves.slice(0, 4);
  }

  const pokemonArtwork = pokemon.sprites.other['official-artwork'].front_default;
  const { chain } = evolutionChain;
  const fourPokemonMoves = getMostPowerfullMoves(pokemon);

  const [selectedMove, setSelectedMove] = useState(fourPokemonMoves[0]);

  const name1 = chain.species.name;
  const name2 = chain.evolves_to[0].species.name;
  console.log(chain);
  console.log(name1, name2);

  const memoStats = useMemo(() => {
    return {
      hp: {
        label: 'Health Points :',
        value: pokemon.stats.hpStat,
        styles: {
          backgroundColor: '#5ABA4A',
          width: `${((pokemon.battleStats.hpStat / MAX_STATS.HP_STAT) * 100).toFixed(3)}%`,
          height: '0.375rem',
          borderRadius: '0.625rem',
        },
      },
      atk: {
        label: 'Attack :',
        value: pokemon.stats.atkStat,
        styles: {
          backgroundColor: '#F37336',
          width: `${((pokemon.battleStats.atkStat / MAX_STATS.ATK_STAT) * 100).toFixed(3)}%`,
          height: '0.375rem',
          borderRadius: '0.625rem',
        },
      },
      def: {
        label: 'Defence :',
        value: pokemon.stats.defStat,
        styles: {
          backgroundColor: '#63C8F2',
          width: `${((pokemon.battleStats.defStat / MAX_STATS.DEF_STAT) * 100).toFixed(3)}%`,
          height: '0.375rem',
          borderRadius: ' 0.625rem',
        },
      },
      spAtk: {
        label: 'Sp. Attack :',
        value: pokemon.stats.spAtkStat,
        styles: {
          backgroundColor: '#D88DBC',
          width: `${((pokemon.battleStats.spAtkStat / MAX_STATS.SPATK_STAT) * 100).toFixed(3)}%`,
          height: '0.375rem',
          borderRadius: '0.625rem',
        },
      },
      spDef: {
        label: 'Sp. Defence :',
        value: pokemon.stats.spDefStat,
        styles: {
          backgroundColor: '#1E3E72',
          width: `${((pokemon.battleStats.spDefStat / MAX_STATS.SPDEF_STAT) * 100).toFixed(3)}%`,
          height: '0.375rem',
          borderRadius: '0.625rem',
        },
      },
      speed: {
        label: 'Speed :',
        value: pokemon.stats.speed,
        styles: {
          backgroundColor: '#F7CC3B',
          width: `${((pokemon.battleStats.speedStat / MAX_STATS.SPEED_STAT) * 100).toFixed(3)}%`,
          height: '0.375rem',
          borderRadius: '0.625rem',
        },
      },
    };
  }, [pokemon]);

  function onClickOpenDetails(move) {
    if (selectedMove?.id === move.id) {
      setSelectedMove(null);
      return;
    }
    setSelectedMove(move);
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <section className={styles.pokemonDetailsContaier}>
        <div className={styles.pokemonImgContainer}>
          <img className={styles.image} src={pokemonArtwork} alt={pokemon.name} />
        </div>
        <div className={styles.pokemonInfo}>
          <div className={styles.upperSection}>
            <div className={styles.title}>
              <h1>{pokemon.name}</h1>
              <div>
                {pokemon.types.map(type => (
                  <img src={`/assets/img/${TYPE_TO_IMG[type]}`} alt={type} className={styles.typeImg} />
                ))}
              </div>
            </div>
            <div className={styles.movesContainer}>
              {fourPokemonMoves.map(move => (
                <>
                  <PrimaryButton onClick={() => onClickOpenDetails(move)}>{move.name}</PrimaryButton>
                  {move.id === selectedMove?.id && (
                    <div className={styles.moveDetails}>
                      <img
                        src={`/assets/img/${TYPE_TO_IMG[move.type.name]}`}
                        alt={move.type.name}
                        className={styles.typeImg}
                      />
                      <p>{DUMMY_TEXT}</p>
                      <div className={styles.moveInfo}>
                        <p className={styles.moveInfoText}>{`Power: ${move.power}`}</p>
                        <p className={styles.moveInfoText}>{`Accuracy: ${move.accuracy}`}</p>
                        <p className={styles.moveInfoText}>{`PP: ${move.pp}`}</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className={styles.lowerSection}>
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
          </div>
        </div>
      </section>

    </>
  );
}

export async function getServerSideProps(context) {
  async function getMoves(tempPokemon) {
    const allMoves = await getPokemonMoves(tempPokemon);
    return { ...tempPokemon, moves: allMoves };
  }

  const { slug } = context.params;
  const pokemonName = slug[0].toLowerCase();
  const _pokemon = await getPokemon(pokemonName);
  const pokemonTransformed = transformPokemon(_pokemon);
  const pokemonWithMoves = await getMoves(pokemonTransformed);
  const _pokemonSpecies = await getPokemonSpecies(_pokemon.species.url);
  const _evolutionChain = await getPokemonEvolutionChain(_pokemonSpecies.evolution_chain.url);
  const pokemonJSON = JSON.stringify(pokemonWithMoves);
  const evolutionChainJSON = JSON.stringify(_evolutionChain);

  return {
    props: {
      _pokemon: pokemonJSON,
      _evolutionChain: evolutionChainJSON,
    },
  };
}
