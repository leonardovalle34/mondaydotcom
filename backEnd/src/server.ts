import express from 'express';
const app = express();
const port = 3000;
import router from './router';

app.get('/', (req, res) => {
  res.send(`Server running at http://localhost:${port}`);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
