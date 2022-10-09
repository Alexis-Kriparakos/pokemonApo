/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Trainer1Team, Trainer2Team } from '../../store/teamStore';

import PokemonTeamCard from './PokemonTeamCard';
import styles from './PokemonTeam.module.css';

export default function PokemonTeam({ trainer }) {
  const [pokemonInTeam, setPokemoninTeam] = useState([]);
  const trainerName = trainer === '1' ? 'Ash Ketchum' : 'Gary Oak';
  useEffect(() => {
    if (trainer === '1') {
      const team$ = Trainer1Team.subscribe(setPokemoninTeam);
      return () => {
        team$.unsubscribe();
      };
    }
    const team$ = Trainer2Team.subscribe(setPokemoninTeam);
    return () => {
      team$.unsubscribe();
    };
  }, []);

  return (
    <section>
      <header>
        <p>{trainerName}</p>
        <div>
          {pokemonInTeam.map((pokemon) => (
            <img key={pokemon.id} className={styles.pokeballIMG} src="/assets/img/Pokeball.png" alt="pokeball" />
          ))}
        </div>
      </header>
      <main>
        {pokemonInTeam.lenght !== 0 && (
        <div>
          {pokemonInTeam.map((pokemon) => (
            <PokemonTeamCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>
        )}
      </main>
    </section>
  );
}
