import express from 'express';
import cors from 'cors';

var fetch = require('node-fetch');
const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json(pc);
});

app.get('/:level1Param', (req, res) => {
  if (req.params.level1Param == 'volumes') {
    var map = getVolumesJson();
    res.json(strMapToObj(map));
  }

  for (var i in pc) {
    var key = i;
    var value = pc[i];
    if (req.params.level1Param == key) {
      res.json(value);
    }
  }

  res.status(404).send('Not Found');
});

function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }

  return obj;
}

function getVolumesJson() {
  var myMap = new Map();
  for (var i in pc.hdd) {
    var hdd = pc.hdd[i];
    if (myMap.get(hdd.volume)) {
      var value = myMap.get(hdd.volume);
      console.log(value);
      myMap.set(hdd.volume, (+value + +hdd.size).toString());
    } else {
      myMap.set(hdd.volume, hdd.size.toString());
    }
  }

  for (var [key, value] of myMap.entries()) {
    myMap.set(key, value + 'B');
  }

  return myMap;
}

app.get('/:level1Param/:level2Param', (req, res) => {
  for (var i in pc) {
    var key = i;
    var value = pc[i];
    if (req.params.level1Param == key) {
      for (var j in value) {
        var key2 = j;
        var value2 = value[j];
        if (req.params.level2Param == key2) {
          res.json(value2);
        }
      }
    }
  }

  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });
