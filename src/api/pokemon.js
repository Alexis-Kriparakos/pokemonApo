import axios from 'axios';
import get from 'lodash/get'
import PokemonStore from '../store/pokemonStrore';

const baseURL = 'https://pokeapi.co/api/v2';
const POKE = axios.create({
    baseURL,
    
});

export async function getPokemonList(limit) {
    try {
        const response = await POKE.get(`/pokemon?limit=${limit}`)
        const pokemon = get(response, 'data.results');
         return pokemon;

    } catch (error) {
        console.log(error)
    }
}

export async function getPokemon(pokeName) {
    try {
        const response = await POKE.get(`/pokemon/${pokeName}/`);
        const name = get(response,'data.species.name');
        const moves = get(response,'data.moves');
        const sprites = get(response,'data.sprites');
        const types = get(response, 'data.types');
        const stats = get(response, 'data.stats')
        return {name, moves, sprites, types, stats};
    } catch (error) {
        console.log(error)
    }
}

export default {getPokemonList}