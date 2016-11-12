import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/2B', (req, res) => {
  var fio = ''
  const arrayString = req.query.fullname.split(' ');
  const re = new RegExp('([0-9])')
  console.log(req.query.fullname.match(re))
  if (arrayString.length > 3 || req.query.fullname.length == 0 ||
    (req.query.fullname.match(re)!=null && req.query.fullname.match(re)[0].length > 0)
    || req.query.fullname.indexOf('_')!=-1 || req.query.fullname.indexOf('/')!=-1) {
    res.send('Invalid fullname');
  } else {
    fio += arrayString[arrayString.length - 1]
    for (var i = 0; i <= arrayString.length - 2; i++) {
      fio += ' ' + arrayString[i][0] + '.'
    }
  }
  res.send(fio);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
