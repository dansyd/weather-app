const express = require('express');
const axios = require('axios');
const initialData = require('./data');
const app = express();

const BASE_URL = 'https://api.darksky.net/forecast/';
const API_KEY = process.env.DARKSKY_API_KEY;


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
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server started on port 3001');
})
