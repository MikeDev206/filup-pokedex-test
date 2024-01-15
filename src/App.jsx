import React from "react";
import PokemonList from "./Components/PokemonList";
import handleDownloadPDF from "./utils/handleDownloadPDF";


function App() {
	return (
		<div>
			<PokemonList handleDownloadPDF={handleDownloadPDF} />
		</div>
	);
}

export default App;
