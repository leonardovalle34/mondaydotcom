
import express from "express"
const app = express();
const port = 3000;
import axios from "axios";
import ICountries from "./interface/Interface";

app.get('/', (req, res) => {
  res.send(`Server running at http://localhost:${port}`);
});


app.use((req,res, next)=> {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','*');
  res.setHeader('Access-Control-Allow-Headers','*');

  next()
})

app.get('/countries', async (req, res) => {
  try {
    const response : ICountries = await axios.get('https://restcountries.com/v3.1/all');
    res.json(response.data); 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer a chamada de API' });
  }  
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});