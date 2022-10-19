
import { useState } from 'react';
import logo from '../../img/logo.svg'
import './App.css';
import Axios from 'axios'
   
function LandingPage() {

  const pokemonModel = { 
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    type: '',
}

  const [pokemonName, setPokemonName] = useState('');
  const [choosenPokemon, setChoosenPokemon] = useState(false);
  const [pokemon, setPokemon] = useState(pokemonModel);

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (respons) => {
        console.log(respons)
        setPokemon({
          name: pokemonName,
          species: respons.data.species.name,
          img: respons.data.sprites.front_default,
          hp: respons.data.stats[0].base_stat,
          attack: respons.data.stats[1].base_stat,
          defense: respons.data.stats[2].base_stat,
          type: respons.data.types[0].type.name,
        })
        setChoosenPokemon(true);
      }
    )
  };
 

  //handlers 
  const handleSearch = (e) =>  {
    e.preventDefault();
    searchPokemon();
  };


  return (
    <div className="landingPage">
      <header className="App-header">
        <h1> Pokémon Luke ⭐️</h1>
        <img src={logo} className="App-logo" alt="logo" />
         
      <div>
        {!choosenPokemon && <p className='center'>Välj en pokemon</p>}
        <input
          className='searchInput' 
          placeholder='Välj en Pokemon'
          type='text'
          onChange={(event) => {
            setPokemonName(event.target.value).toLowerCase()
          }}
        />
        <button className='searchButton' onClick={handleSearch}>Sök Pokemon</button>
        </div>
          <>{!choosenPokemon ? (null) : (
            <div className='pokemonWrapper'>
              <h1>{pokemon.name}</h1> 
            <div className='infoWrapper'>
              <img className="pokemonImage" src={pokemon.img} />
              <div className='pokemonInfo'>
                <p>Art: {pokemon.species}</p> 
                <p>Typ: {pokemon.type}</p> 
                <p>HP: {pokemon.hp}</p> 
                <p>Attack: {pokemon.attack}</p> 
                <p>Försvar: {pokemon.defense}</p> 
              </div>

            </div>
            </div>
          )}
        </>
     
      </header>
  
    </div>
  );
}

export default LandingPage;