const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.get("/", (req, res) => {
    //console.log("req from user cab", req);   
    
      db.query(`SELECT orders.*, users.first_name as sitter_name, users.photo as sitter_photo
      FROM orders
      LEFT JOIN users ON orders.sitter_id = users.id
      WHERE orders.parent_id = 1
      ORDER BY orders.id;`)

        .then((data)=>{
        //console.log("get user-cabinet", data.rows)
        res.json(data.rows);
      });  
  });
return router;
}