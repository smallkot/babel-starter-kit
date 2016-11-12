import express from 'express';
import cors from 'cors';
import getUsername from './canonize';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/2C', (req, res) => {
  const url = req.query.username
  const username = getUsername(url);
  res.send('@'+username);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
