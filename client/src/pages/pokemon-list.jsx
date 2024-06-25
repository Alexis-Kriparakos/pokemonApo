import React, { useEffect, useState } from 'react';

import { getData } from '../api/pokemon';
import Header from '../components/Header/Header';
import PokemonList from '../components/PokemonList/PokemonList';
import PokemonTeam from '../components/PokemonTeam/PokemonTeam';
import PokemonStore from '../store/pokemonStore';
import { PokemonToShow } from '../store/pokemonToShow';
import { Trainer1Team, Trainer2Team } from '../store/teamStore';
import io from 'socket.io-client';

import styles from './pokemonList.module.scss';

const socket = io('http://localhost:3010');

export default function Index({ pokemon }) {
  useEffect(() => {
    PokemonStore.update(pokemon);
    const [allPokemon] = Object.values(pokemon);
    PokemonToShow.update({ region: 'kanto', pokemon: allPokemon });
  }, []);

  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('startGame', (room) => {
      setMessage(`Game starting in room ${room}`);
      // Start the game logic here
    });

    socket.on('roomFull', (room) => {
      setMessage(`Room ${room} is full`);
    });

    return () => {
      socket.off('startGame');
      socket.off('roomFull');
    };
  }, []);

  const joinRoom = () => {
    socket.emit('joinRoom', room);
  };

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <div>
          <h1>Pokemon Battle</h1>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room name"
          />
          <button onClick={joinRoom}>Join Room</button>
          {message && <p>{message}</p>}
        </div>
        <PokemonTeam trainer="1" team={Trainer1Team} isLeft />
        <PokemonList />
        <PokemonTeam trainer="2" team={Trainer2Team} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const [pokemon] = await Promise.all([
    getData(),
  ]);

  return {
    props: {
      pokemon,
    },
  };
}
