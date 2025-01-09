/* const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./config/db');





dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());



app.get('/products', (req, res) => {
    res.status(200).json({ message: 'Hello rota belirlendi' });
});





db();

const PORT = 4004
app.listen(PORT, () => 
    {
        console.log(`Server is running on port ${PORT}`)
    }); */


    const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.get("/products", (req, res) => {
  res.status(200).json({ message: "Hello rota belirlendi" });
});

// Veritabanını başlat
db();

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
