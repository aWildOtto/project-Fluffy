const ENV = process.env.ENV || "development";

const http = require('http');
const express = require("express");
const app = express();
const server = http.createServer(app);
const path = require('path');

const knexConfig = require("./knexfile");
const knexLogger = require('knex-logger');
const knex = require("knex")(knexConfig[ENV]);
const dbHelper = require("./lib/dbHelper")(knex);
app.use(knexLogger(knex));

const bodyParser = require("body-parser");
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'build')));

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running at localhost:' + process.env.PORT || 3000);
});