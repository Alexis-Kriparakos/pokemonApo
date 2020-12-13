import { BehaviorSubject } from 'rxjs';

const pokemonStore$ = new BehaviorSubject([]);



const PokemonStore = {
    update: pokemon => {
        pokemonStore$.next(pokemon);
    },
    subscribe: setPokemon => pokemonStore$.subscribe(setPokemon),
    getValue: () => pokemonStore$.value,

};

export default PokemonStore;
