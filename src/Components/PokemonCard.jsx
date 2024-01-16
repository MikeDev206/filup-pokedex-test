import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonCard = ({ pokemon, handleDownloadPDF }) => {
	const [pokemonDetails, setPokemonDetails] = useState(null);

	useEffect(() => {
		const fetchPokemonDetails = async () => {
			try {
				const response = await axios.get(pokemon.url);
				setPokemonDetails(response.data);
			} catch (error) {
				console.error("Error fetching Pokemon details:", error);
			}
		};

		fetchPokemonDetails();
	}, [pokemon.url]);

	const spriteUrl = pokemonDetails?.sprites?.front_default || "";

	return (
		<li>
			<div>
				{spriteUrl && <img src={spriteUrl} alt={`Imagen de ${pokemon.name}`} />}
				<p>{pokemon.name}</p>
				<button onClick={() => handleDownloadPDF(pokemon.name)}>
					Descargar PDF
				</button>
			</div>
		</li>
	);
};

export default PokemonCard;
