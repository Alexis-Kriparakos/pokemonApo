import React, { useEffect, useState } from 'react';
import PokemonToShow from '../../store/pokemonToShow';
import PokemonStore from '../../store/pokemonStrore';
import PokemonCard from '../PokemonCard/PokemonCard';
import { REGIONS_POKEMON } from '../../constants/constants';

import styles from './PokemonList.module.css';

export default function PokemonList() {
  const allRegions = Object.keys(REGIONS_POKEMON);

  const [pokemonList, setPokemonList] = useState([]);

  async function onSetRegion(region) {
    const allPokemon = PokemonStore.getValue();
    const pokemonNewRegion = await PokemonStore.onPokemonFetch(region);
    PokemonStore.update({ ...allPokemon, ...pokemonNewRegion });
    PokemonToShow.update(pokemonNewRegion[region]);
    console.log({ ...allPokemon, ...pokemonNewRegion });
  }

  useEffect(() => {
    const pokemontoShow$ = PokemonToShow.subscribe(setPokemonList);

    return () => {
      pokemontoShow$.unsubscribe();
    };
  }, []);

  if (!pokemonList.length) return null;

  return (
    <section className={styles.container}>
      <div className={styles.btnContainer}>
        {allRegions.map((region) => (
          <button
            key={region}
            type="button"
            className={styles.btn}
            onClick={() => onSetRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
      <div className={styles.pokemonList}>
        {pokemonList.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    </section>
  );
}
