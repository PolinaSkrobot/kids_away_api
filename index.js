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
const neworderRoutes = require("./routes/neworder");
const userRoutes = require("./routes/user-cabinet");
const sitterOrdersRoutes = require("./routes/sitter-cabinet");
const parentReviewRoutes = require("./routes/parent-review");
const sitterStatusRoutes = require("./routes/sitter-status");
const userReviewRoutes = require("./routes/user-review");
const deleteOrderRoutes = require('./routes/deleteOrder.js')
const mainRoutes = require("./routes/main");
  // Mount all resource routes
app.use("/babysitter-profile", profileRoutes(db));
app.use("/searchBabysitters", searchRoutes(db));
app.use("/favourites", favRoutes(db));
app.use("/babysitterCabinet", sitterRoutes(db));
app.use("/neworder", neworderRoutes(db));
app.use("/user-cabinet", userRoutes(db));
app.use("/sitter-cabinet", sitterOrdersRoutes(db));
app.use("/user-review", userReviewRoutes(db));
app.use("/parent-review", parentReviewRoutes(db));
app.use("/sitter-status", sitterStatusRoutes(db));


app.use('/delete-order', deleteOrderRoutes(db))
app.use("/", mainRoutes(db));

app.listen(PORT, ()=>{
  console.log("listening on ", PORT);
});