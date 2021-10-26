const PORT = 8001;
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
const mainRoutes = require("./routes/main");
const favRoutes = require("./routes/favourites");
  // Mount all resource routes
app.use("/searchBabysitters", searchRoutes(db));
app.use("/", mainRoutes(db));
app.use("/favourites", favRoutes(db));
// module.exports=()=>{
//   app.get('/', (req, res) => {
//   res.send('Hello World')
// });}
app.listen(PORT);