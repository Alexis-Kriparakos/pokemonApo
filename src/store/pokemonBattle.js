import { BehaviorSubject } from 'rxjs';

const pokemonBattle$ = new BehaviorSubject({});
const isBattle$ = new BehaviorSubject(false);

export const IsBattle = {
    update: isBattle => {
        isBattle$.next(isBattle);
    },
    subscribe: isBattle => isBattle$.subscribe(isBattle),

};

export const PokemonBattle = {
    update: pokemon => {
        pokemonBattle$.next(pokemon);
    },
    subscribe: setPokemon => pokemonBattle$.subscribe(setPokemon),
    getValue: () => pokemonBattle$.value,
    isBattle: () => isBattle$.value,
    // player1Team : () =>
    // player2Team: () => 
};

export default {PokemonBattle,IsBattle};