const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.static('public'));
app.use(morgan('dev'));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' mongoose database connected....');
  })
  .catch(err => {
    console.log('err ===', err);
  });

app.use(express.json());

app.listen(port, () => {
  console.log(`server started at the port ${port}`);
});