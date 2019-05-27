const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({
    message: 'hello'
  });
})

const port = 3001;
mongoose.connect('mongodb://localhost/bongbong').then(
  app.listen(port, () => console.log(`App listening on port ${port}`))
)
