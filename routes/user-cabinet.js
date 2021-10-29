const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.get("/", (req, res) => {
    db.query(`SELECT *
    FROM orders
    WHERE parent_id=6;`)
      .then((data)=>{
        console.log("get user-cabinet")
        res.json(data.rows);
      });  
  });
return router;
}