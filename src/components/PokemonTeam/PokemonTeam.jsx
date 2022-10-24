/* eslint-disable react/prop-types */
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import styles from './PokemonTeam.module.scss';
import PokemonTeamCard from './PokemonTeamCard';

export default function PokemonTeam({
  trainer, team, isLeft = false, isBattle = false, onClick = () => {},
}) {
  const [pokemonInTeam, setPokemoninTeam] = useState([]);
  const [isCollasped, setIsCollasped] = useState(false);

  const trainerName = trainer === '1' ? 'Ash Ketchum' : 'Gary Oak';
  useEffect(() => {
    const team$ = team.subscribe(setPokemoninTeam);
    return () => {
      team$.unsubscribe();
    };
  }, []);

  function returnArrows() {
    if (isLeft) {
      return (
        <div>
          {isCollasped ? <MdKeyboardArrowRight className={styles.icon} />
            : <MdKeyboardArrowLeft className={styles.icon} />}
        </div>
      );
    }
    return (
      <div>
        {isCollasped ? <MdKeyboardArrowLeft className={styles.icon} />
          : <MdKeyboardArrowRight className={styles.icon} />}
      </div>
    );
  }

  return (
    <section className={styles.container}>
      {!isBattle && (
      <button
        type="button"
        className={cn(styles.collaspeButton, { [styles.isLeft]: isLeft, [styles.isRight]: !isLeft })}
        onClick={() => setIsCollasped(!isCollasped)}
      >
        {returnArrows()}
      </button>
      )}
      <div className={cn(styles.teamContainer, { [styles.collasped]: isCollasped })}>
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
      </div>
    </section>
  );
}
