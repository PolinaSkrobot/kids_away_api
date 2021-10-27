const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM availability
    WHERE sitter_id=6;`)
      .then((data)=>{
        console.log("hbfjeb")
        res.json(data.rows);
      });  
  });
return router;
}