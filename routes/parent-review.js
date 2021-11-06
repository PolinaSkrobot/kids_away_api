const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.post("/", (req, res) => {
    const data = JSON.parse(req.query.review); 
    Promise.all([
      db.query(`
      UPDATE orders
      SET status = 'completed'
      WHERE orders.id=$1;
      `, [data.order_id]),
       db.query(`
      insert into reviews_for_parent (order_id, comment, rate) values ($1, $2, $3);
      `, [data.order_id, data.message, data.rate])]
    )   
    .then((result) => {
      res.send([result[0].command, result[1].command]);
    })
  });
return router;
}