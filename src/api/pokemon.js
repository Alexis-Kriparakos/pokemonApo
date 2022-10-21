import axios from 'axios';
import get from 'lodash/get';

import { REGIONS_POKEMON } from '../constants/constants';
import { transformPokemon } from '../helpers/transformer';

const baseURL = 'https://pokeapi.co/api/v2';
const POKE = axios.create({
  baseURL,
});

export async function getPokemonList(limit = 150, offset = 0) {
  try {
    const response = await POKE.get(`/pokemon?limit=${limit}&offset=${offset}`);
    const pokemon = get(response, 'data.results');
    return pokemon;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPokemon(pokeName) {
  try {
    const response = await POKE.get(`/pokemon/${pokeName}/`);
    const name = get(response, 'data.species.name');
    const moves = get(response, 'data.moves');
    const sprites = get(response, 'data.sprites');
    const types = get(response, 'data.types');
    const stats = get(response, 'data.stats');
    const id = get(response, 'data.id');
    const weight = get(response, 'data.weight');
    return {
      id, name, moves, sprites, types, stats, weight,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getData(region = 'kanto') {
  const { number, offset } = REGIONS_POKEMON[region];
  const pokemonList = await getPokemonList(number, offset);
  const pokemonListWithInfo = await Promise.all(pokemonList.map(p => {
    const pokemon = getPokemon(p.name);
    return pokemon;
  }));
  const pokemonListWithStats = pokemonListWithInfo
    .map(poke => transformPokemon(poke));
  return { [region]: pokemonListWithStats };
}

export async function getPokemonMove(moveURL) {
  try {
    const response = await axios.get(moveURL);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default {
  getPokemonList, getPokemon, getData, getPokemonMove,
};
