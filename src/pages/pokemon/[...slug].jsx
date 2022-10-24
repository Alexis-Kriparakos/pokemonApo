// import orderBy from 'lodash/orderBy';

import orderBy from 'lodash/orderBy';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { getPokemonSpecies, getPokemonEvolutionChain, getPokemon } from '../../api/pokemon';
import { PrimaryButton } from '../../components/Buttons/Buttons';
import Header from '../../components/Header/Header';
import { MEMO_STATS, TYPE_TO_IMG, DUMMY_TEXT } from '../../constants/constants';
import { getEvolutionChainTransformed, findOrGetPokemonChain } from '../../helpers/evolution';
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
  const fourPokemonMoves = getMostPowerfullMoves(pokemon);

  const [selectedMove, setSelectedMove] = useState();
  const [evolutions, setEvolutions] = useState([]);

  const memoStats = MEMO_STATS(pokemon);

  useEffect(() => {
    const { chain } = evolutionChain;
    async function getEvolutionPokemon() {
      const evoChain = getEvolutionChainTransformed(chain);
      const pokemonInEvolution = await findOrGetPokemonChain(evoChain);
      setEvolutions(pokemonInEvolution);
    }
    getEvolutionPokemon().catch(console.error);
  }, []);

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
        <div className={styles.leftSection}>
          <div className={styles.pokemonImgContainer}>
            <img className={styles.image} src={pokemonArtwork} alt={pokemon.name} />
          </div>
          <div className={styles.evolutionChain}>
            {evolutions.map(poke => (
              <Link key={poke.id} href={`/pokemon/${poke.name}`}>
                <a className={styles.linkEvoChain}>
                  <img
                    className={styles.smallImage}
                    src={poke.sprites.front_default}
                    alt={pokemon.name}
                  />

                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.pokemonInfo}>
          <div className={styles.upperSection}>
            <div className={styles.title}>
              <h1>{pokemon.name}</h1>
              <div>
                {pokemon.types.map(type => (
                  <img key={type} src={`/assets/img/${TYPE_TO_IMG[type]}`} alt={type} className={styles.typeImg} />
                ))}
              </div>
            </div>
            <div className={styles.movesContainer}>
              {fourPokemonMoves.map(move => (
                <React.Fragment key={move.id}>
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
                </React.Fragment>
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
