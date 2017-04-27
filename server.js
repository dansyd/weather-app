const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const initialData = require('./data');

const app = express();
app.use(express.static('client/build'));

const BASE_URL = 'https://api.darksky.net/forecast/';
const API_KEY = process.env.DARK_SKY_API_KEY;

app.get('/api/init', (req,res) => {
  var initialResult = []
  initialData.forEach((city) => {
    const time = Math.floor(new Date() / 1000);
    const url = `${BASE_URL}${API_KEY}/${city.lat},${city.long},${time}?exclude=minutely,daily,alerts,flags&units=si`
    axios.get(url)
      .then( result => {
        initialResult.push({ name: city.name, data: result.data });
        if (initialResult.length === 3) {
          res.send(initialResult);
        };
      }).catch( error => {
        throw error;
      });
  })
});

app.post('/api', (req, res) => {
  const time = Math.floor(new Date() / 1000);
  const url = `${BASE_URL}${API_KEY}/${req.query.lat},${req.query.long},${time}?exclude=minutely,daily,alerts,flags&units=si`
  axios.get(url)
    .then( result => {
      res.send(result.data);
    }).catch( error => {
      throw error;
    });
});

// Always return the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server started on port 3001');
})
