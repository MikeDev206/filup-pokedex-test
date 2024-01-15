export default function handleDownloadPDF(pokemonID) {
	const url = `/pokemons/pdf/${this.props.pokemon.id}`;
	window.location.href = url;
}

