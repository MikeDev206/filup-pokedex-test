import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/pokemons");
        setPokemons(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Cargando Pokémons...</p>
      ) : error ? (
        <p>Error al cargar Pokémons: {error.message}</p>
      ) : (
        <div>
          <h2>Lista de Pokémons</h2>
          <ul>
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
