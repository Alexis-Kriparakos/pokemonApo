import {BehaviourSubject} from 'rxjs'

const pokemonStore$ = new BehaviourSubject([]);
const pokemonFetched$ = new BehaviourSubject(false);

const PokemonFetched = {
    update: fetched => {
        pokemonFetched$.next(fetched);
    }
};

const PokemonStore = {
    update: pokemon => {
        pokemonStore$.next(pokemon);
        PokemonFetched.update(true);
    },
    subscribe: setPokemon => pokemonStore$.subscribe(setPokemon),
    getValue: () => pokemonStore$.value,
    isFetched: () => pokemonFetched$.value,
};

export default PokemonStore;
