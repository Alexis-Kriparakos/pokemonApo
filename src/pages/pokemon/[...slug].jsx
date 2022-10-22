// import orderBy from 'lodash/orderBy';

import orderBy from 'lodash/orderBy';
import React, { useMemo } from 'react';

import { getPokemonSpecies, getPokemonEvolutionChain, getPokemon } from '../../api/pokemon';
import Header from '../../components/Header/Header';
import { MAX_STATS } from '../../constants/constants';
import { getPokemonMoves } from '../../helpers/pokemonWithMoves';
import { transformPokemon } from '../../helpers/transformer';

import styles from './pokemonDetails.module.css';

export default function PokemonPage({ _pokemon, _pokemonSpecies, _evolutionChain }) {
  const pokemon = JSON.parse(_pokemon);
  const pokemonSpecies = JSON.parse(_pokemonSpecies);
  const evolutionChain = JSON.parse(_evolutionChain);

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

  function getMostPowerfullMoves() {
    const sortedMoves = orderBy(pokemon.moves, ({ power }) => power || 0, 'desc');
    return sortedMoves.slice(0, 4);
  }
  const pokemonArtwork = pokemon.sprites.other['official-artwork'].front_default;
  const [evolvesTo] = evolutionChain.chain.evolves_to;
  // const fourPokemonMoves = getMostPowerfullMoves(pokemon);
  console.log(pokemon);
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
            MOVES INFO
          </div>
          <div className={styles.lowerSection}>
            {Object.values(memoStats).map(stat => (
              <div className={styles.statContainer}>
                <div className={styles.stats}>
                  <p>{stat.label}</p>
                  <p>{stat.value}</p>
                </div>
                <div className={styles.statsBar}>
                  <div style={stat.styles} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* {pokemonFourMoves.map(move => (
        <div>{move.name}</div>
      ))} */}
    </>
  );
}
// export async function getStaticPaths() {
//   const paths = [];
//   return { paths, fallback: true };
// }

export async function getServerSideProps(context) {
  async function getMoves(_pokemon) {
    const allMoves = await getPokemonMoves(_pokemon);
    return { ..._pokemon, moves: allMoves };
  }

  const { slug } = context.params;
  const pokemonName = slug[0].toLowerCase();
  const _pokemon = await getPokemon(pokemonName);
  const pokemonTransformed = transformPokemon(_pokemon);
  // const pokemonWithMoves = await getMoves(_pokemon);
  const _pokemonSpecies = await getPokemonSpecies(pokemonTransformed.species.url);
  const _evolutionChain = await getPokemonEvolutionChain(_pokemonSpecies.evolution_chain.url);
  const pokemonJSON = JSON.stringify(pokemonTransformed);
  const evolutionChainJSON = JSON.stringify(_evolutionChain);
  const pokemonSpeciesJSON = JSON.stringify(_pokemonSpecies);

  return {
    props: {
      _pokemon: pokemonJSON,
      _pokemonSpecies: pokemonSpeciesJSON,
      _evolutionChain: evolutionChainJSON,
    },
  };
}
