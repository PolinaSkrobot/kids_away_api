const PORT = 3001;
const express = require('express');
const app = express();

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./db/db");
const db = new Pool(dbParams);

db
  .connect()
  .then(()=> {
    console.log('db connected7777');
  })
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));;


const searchRoutes = require("./routes/search");
  
  // Mount all resource routes
app.use("/searchBabysitters", searchRoutes(db));

app.get('/', function (req, res) {
  res.send('Hello World')
});
app.listen(PORT);