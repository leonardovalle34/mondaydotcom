import express from "express"
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Server running at http://localhost:${port}`);
});

app.get('/teste', (req,res)=>{
  res.send(
    {
      "name":"teste"
    }
  )
})
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});