/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import styles from './PokemonTeam.module.css';
import PokemonTeamCard from './PokemonTeamCard';

export default function PokemonTeam({
  trainer, team, isBattle, onClick = () => {},
}) {
  const [pokemonInTeam, setPokemoninTeam] = useState([]);
  const trainerName = trainer === '1' ? 'Ash Ketchum' : 'Gary Oak';
  useEffect(() => {
    const team$ = team.subscribe(setPokemoninTeam);
    return () => {
      team$.unsubscribe();
    };
  }, []);

  return (
    <section className={styles.teamContainer}>
      <header className={styles.header}>
        <p>{trainerName}</p>
        {pokemonInTeam.map(pokemon => (
          <img key={pokemon.id} className={styles.pokeballIMG} src="/assets/img/Pokeball.png" alt="pokeball" />
        ))}
      </header>
      <main>
        {pokemonInTeam.lenght !== 0 && (
        <div>
          {pokemonInTeam.map(pokemon => (
            <PokemonTeamCard
              key={pokemon.id}
              pokemon={pokemon}
              team={team}
              isBattle={isBattle}
              onClick={() => onClick(pokemon)}
            />
          ))}
        </div>
        )}
      </main>
    </section>
  );
}
