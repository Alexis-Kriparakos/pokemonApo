import axios from 'axios';
import get from 'lodash/get'

const baseURL = 'https://pokeapi.co/api/v2';
const POKE = axios.create({
    baseURL
})

export async function getPokemon() {
    try {
        const response = await POKE.get('/pokemon')
         return response
    } catch (error) {
        console.log(error)
    }
}

export default {getPokemon}