// PokemonList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import handleDownloadPDF from "../utils/handleDownloadPDF";

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [nextPageUrl, setNextPageUrl] = useState(null);
	const [limit, setLimit] = useState(20);
	const [offset, setOffset] = useState(0);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchPokemons = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(
					`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}&search=${search}`
				);
				setPokemons(response.data.results);
				setNextPageUrl(response.data.next);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPokemons();

		setPokemons((prevPokemons) => prevPokemons.sort((a,b) => a.name.localeCompare(b.name)));
	}, [limit, offset, search]);

	const handleFetchPokemons = async () => {
		if (nextPageUrl) {
			setIsLoading(true); // Establece isLoading a true antes de la solicitud
			try {
				const response = await axios.get(nextPageUrl);
				setPokemons((prevPokemons) => [
					...prevPokemons,
					...response.data.results,
				]);
				setNextPageUrl(response.data.next);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<>
			<div style={{ margin: 10 }}>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Buscar Pokemon"
				/>
			</div>
			{isLoading ? (
				<p>Cargando Pokemons...</p>
			) : error ? (
				<p>Error al cargar Pokemons: {error.message}</p>
			) : (
				<div>
					<h2>Lista de Pokemons</h2>
					<ul>
						{pokemons &&
							pokemons.map((pokemon) => (
								<PokemonCard
									key={pokemon.name}
									pokemon={pokemon}
									handleDownloadPDF={() => handleDownloadPDF(pokemon.name)}
								/>
							))}
					</ul>
					<button onClick={handleFetchPokemons}>Cargar más</button>
				</div>
			)}
		</>
	);
};

export default PokemonList;
