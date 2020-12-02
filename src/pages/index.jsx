import {useEffect,useState} from 'react';
import {getPokemonList,getPokemon} from '../api/pokemon'
import PokemonStore from '../store/pokemonStrore'
import PokemonCard from '../components/PokemonCard/PokemonCard';


export default function Index() {
  const [pokemonList,setPokemonList] = useState([]);
  useEffect(() => {
    const limit = 151;
    async function getData() {
      const pokemonList = await getPokemonList(limit);
      const pokemonListWithStats = pokemonList.map(async function(p) {
        const pokemon = await getPokemon(p.name)
        return pokemon 
       })
       console.log(pokemonListWithStats);
      PokemonStore.update(pokemonListWithStats);  
    }
    getData();
    const pokemonList$ = PokemonStore.subscribe(setPokemonList);
    return () => {
      pokemonList$.unsubscribe();
    }
     },[])

  return (
    <>
    <header>
      navigation searchBar
    </header>
    <section>
      <ul>
        {pokemonList.map(pokemon =>(
          <PokemonCard pokemon={pokemon} key={pokemon.name}/>
        ))}
      </ul>
    </section>
    </>
  )
}

