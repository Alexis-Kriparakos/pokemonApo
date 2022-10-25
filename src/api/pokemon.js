import axios from 'axios';
import get from 'lodash/get';

import { REGIONS_POKEMON } from '../constants/constants';
import { transformPokemon } from '../helpers/transformer';

const baseURL = 'https://pokeapi.co/api/v2';
const POKE = axios.create({
  baseURL,
});

export async function getPokemonList(limit = 151, offset = 0) {
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
    const pokemon = await POKE.get(`/pokemon/${pokeName}/`);
    const name = get(pokemon, 'data.species.name');
    const moves = get(pokemon, 'data.moves');
    const sprites = get(pokemon, 'data.sprites');
    const types = get(pokemon, 'data.types');
    const stats = get(pokemon, 'data.stats');
    const id = get(pokemon, 'data.id');
    const weight = get(pokemon, 'data.weight');
    const species = get(pokemon, 'data.species');
    return {
      id, name, moves, sprites, species, types, stats, weight,
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

export async function getPokemonSpecies(speciesURL) {
  try {
    const response = await axios.get(speciesURL);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPokemonEvolutionChain(evolutionURL) {
  try {
    const response = await axios.get(evolutionURL);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default {
  getPokemonList, getPokemon, getData, getPokemonMove, getPokemonSpecies, getPokemonEvolutionChain,
};
