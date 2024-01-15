const express = require('express');
const axios = require('axios');

const app = express();

app.get('/pokemons', async (req, res) => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
  res.send(response.data);
});
