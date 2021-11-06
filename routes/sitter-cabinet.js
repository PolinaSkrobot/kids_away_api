const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.get("/", (req, res) => { 
    
      db.query(`SELECT orders.*, users.first_name as parent_name,
      reviews_for_parent.comment as comment_about_parent, reviews_for_parent.rate as rate
     FROM orders
     LEFT JOIN users ON orders.parent_id = users.id
     LEFT JOIN reviews_for_parent ON orders.id = reviews_for_parent.order_id
     WHERE orders.sitter_id = 6
     ORDER BY orders.id;`)

        .then((data)=>{
        res.json(data.rows);
      });  

  });
return router;
}