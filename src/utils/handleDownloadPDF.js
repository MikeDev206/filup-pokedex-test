
export default function handleDownloadPDF(pokemonID) {
  const url = `/pokemons/pdf/${pokemonID}`;
  window.open(url, '_blank');
}