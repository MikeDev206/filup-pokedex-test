// const express = require('express');
// const axios = require('axios');
// 
// const app = express();
// const PORT = 3000; 
// 
// app.get('/pokemons', async (req, res) => {
//     const { limit = 20, offset = 0 } = req.query;
//     try {
//         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//         res.send(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener datos de la API');
//     }
// });
// 
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });
const express = require('express');
const axios = require('axios');
const path = require('path'); // Asegúrate de importar el módulo 'path'

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public'))); // Ajusta la ruta a tu carpeta 'public' o 'build'

app.get('/pokemons', async (req, res) => {
    const { limit = 20, offset = 0 } = req.query;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos de la API');
    }
});

// Ruta para manejar todas las demás solicitudes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); // Ajusta la ruta a tu archivo HTML principal
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
