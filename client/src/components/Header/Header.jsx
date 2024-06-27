import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import PokemonStore from '../../store/pokemonStore';
import { PokemonToShow } from '../../store/pokemonToShow';

import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  const isPokemonList = router.pathname === '/pokemon-list';
  const isBattlePage = router.pathname === '/battle';
  function onChangeInput(value) {
    const pokemonInRegions = PokemonStore.getValue();
    const { region } = PokemonToShow.getValue();
    const allPokemon = pokemonInRegions[region];
    if (!value.length) {
      PokemonToShow.update({ region, pokemon: allPokemon });
      return;
    }
    const filteredPokemons = allPokemon.filter(pokemon => pokemon.searchTerms
      .find(term => term.indexOf(value) !== -1));
    PokemonToShow.update({ region, pokemon: filteredPokemons });
  }

  return (
    <header className={styles.mainContainer}>
      <div className={styles.container}>
        <Link href="/" className={styles.headerText}>
          <img className={styles.logo} src="/assets/img/Pokémon_logo.png" alt="" />
        </Link>
        {isPokemonList && <input className={cn(styles.input, styles.searchBarBigScreen)} type="text" placeholder="Search Pokemon" onChange={e => onChangeInput(e.target.value)} />}
        {!isBattlePage && (
        <div className={styles.wrapper}>
          <Link href="/battle" className={styles.linkBattle}>
            <span className={styles.span}>Battle</span>
          </Link>
        </div>
        )}
      </div>
      {isPokemonList && <input className={cn(styles.input, styles.searchBarSmallScreen)} type="text" placeholder="Search Pokemon" onChange={e => onChangeInput(e.target.value)} />}
    </header>

  );
}
