// import orderBy from 'lodash/orderBy';

import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import { getPokemonMoves } from '../../helpers/pokemonWithMoves';
import { PokemonSelected } from '../../store/pokemonToShow';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState();
  const [pokemonFourMoves, setPokemonFourMoves] = useState([]);

  async function getMoves(_pokemon) {
    const allMoves = await getPokemonMoves(_pokemon);
    return { ..._pokemon, moves: allMoves };
  }

  function getMostPowerfullMoves(_pokemon) {
    // const sortedMoves = orderBy(_pokemon.moves, ({ power }) => power || 0, 'desc');
    // const fourPokemonMoves = sortedMoves.slice(0, 4);
    // console.log(fourPokemonMoves);
    // setPokemonFourMoves(fourPokemonMoves);
  }

  useEffect(() => {
    const pokemonSelected$ = PokemonSelected.subscribe(async _pokemon => {
      if (!_pokemon) return null;
      // const _pokemonWithMoves = await getMoves(_pokemon);
      // getMostPowerfullMoves(_pokemonWithMoves);
      // setPokemon(_pokemonWithMoves);
      setPokemon(_pokemon);
    });

    return () => pokemonSelected$.unsubscribe();
  }, []);

  if (!pokemon) return null;

  const pokemonArtwork = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <>
      <header>
        <Header />
      </header>
      <div>{pokemon.name}</div>
      {/* {pokemonFourMoves.map(move => (
        <div>{move.name}</div>
      ))} */}
      <img src={pokemonArtwork} alt={pokemon.name} />
    </>
  );
}
