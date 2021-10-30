const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.get("/", (req, res) => {
    //console.log("req from user cab", req);
    db.query(`SELECT *
    FROM orders
    WHERE parent_id=1;`)
      .then((data)=>{
        //console.log("get user-cabinet", data.rows)
        res.json(data.rows);
      });  
  });
return router;
}