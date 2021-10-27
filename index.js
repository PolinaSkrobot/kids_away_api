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
const favRoutes = require("./routes/favourites");
const sitterRoutes = require("./routes/sitterCabinet");
const profileRoutes = require("./routes/babysitter-profile");
const mainRoutes = require("./routes/main");
  // Mount all resource routes
app.use("/searchBabysitters", searchRoutes(db));
app.use("/favourites", favRoutes(db));
app.use("/babysitterCabinet", sitterRoutes(db));
app.use("/babysitter-profile", profileRoutes(db))
app.use("/", mainRoutes(db));

app.listen(PORT, ()=>{
  console.log("listening on ", PORT);
});