import React from "react";

function PokemonCard({ pokemon, handleDownloadPDF }) {
	return (
		<li>
			<h3>{pokemon.nombre}</h3>
			<img src={pokemon.imagen} alt={pokemon.nombre} />
			<p>
				Tipos: {pokemon.tipo1}, {pokemon.tipo2}
			</p>
			<button onClick={() => handleDownloadPDF(pokemon.id)}>
				Descargar PDF
			</button>
		</li>
	);
}

export default PokemonCard;
