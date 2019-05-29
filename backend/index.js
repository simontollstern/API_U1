const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routes);

const port = 3001;
mongoose.connect('mongodb://localhost/bongbong').then(
  app.listen(port, () => console.log(`App listening on port ${port}`))
)
