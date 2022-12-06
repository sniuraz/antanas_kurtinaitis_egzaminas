const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const products = require('./data');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Sveiki užsukę į shopifis');
});

app.get('/products', (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port, console.log(`Server running on port ${port}`));

mongoose
  .set('strictQuery', true)
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful...'))
  .catch((err) => console.log('DB connection failed...', err.message));
