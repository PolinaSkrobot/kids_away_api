const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.get("/", (req, res) => { 
    
      db.query(`SELECT orders.*, users.first_name as sitter_name, users.photo as sitter_photo,
       reviews_for_sitter.comment as comment_about_sitter, reviews_for_sitter.rate as rate
      FROM orders
      LEFT JOIN users ON orders.sitter_id = users.id
      LEFT JOIN reviews_for_sitter ON orders.id = reviews_for_sitter.order_id
      WHERE orders.parent_id = 1
      ORDER BY orders.id;`)

        .then((data)=>{
        res.json(data.rows);
      });  
  });
return router;
}