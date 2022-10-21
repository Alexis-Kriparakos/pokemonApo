import React, { useEffect, useState } from 'react';

import { REGIONS_POKEMON } from '../../constants/constants';
import { capitalizeFirstLetter } from '../../helpers/transformer';
import PokemonStore from '../../store/pokemonStrore';
import { PokemonToShow } from '../../store/pokemonToShow';
import PokemonCard from '../PokemonCard/PokemonCard';

import styles from './PokemonList.module.css';

export default function PokemonList() {
  const allRegions = Object.keys(REGIONS_POKEMON);

  const [pokemonList, setPokemonList] = useState([]);

  async function onSetRegion(region) {
    const allPokemon = PokemonStore.getValue();
    const pokemonNewRegion = await PokemonStore.onPokemonFetch(region);
    PokemonStore.update({ ...allPokemon, ...pokemonNewRegion });
    PokemonToShow.update({ region, pokemon: pokemonNewRegion[region] });
    console.log({ ...allPokemon, ...pokemonNewRegion });
  }

  useEffect(() => {
    const pokemontoShow$ = PokemonToShow.subscribe(pokeList => {
      const { pokemon } = pokeList;
      setPokemonList(pokemon);
    });

    return () => {
      pokemontoShow$.unsubscribe();
    };
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.btnContainer}>
        {allRegions.map(region => (
          <button
            key={region}
            type="button"
            className={styles.btn}
            onClick={() => onSetRegion(region)}
          >
            {capitalizeFirstLetter(region)}
          </button>
        ))}
      </div>
      {pokemonList.length !== 0 && (
      <div className={styles.pokemonList}>
        {pokemonList.map(pokemon => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
      )}
    </section>
  );
}
