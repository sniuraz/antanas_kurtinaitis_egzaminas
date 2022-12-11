const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);

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
