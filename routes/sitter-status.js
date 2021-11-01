const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.post("/", (req, res) => {
    console.log("update", req.query);
    const data = JSON.parse(req.query.status); 
    console.log("update data", data);
      db.query(`
      UPDATE orders
      SET status = $1
      WHERE orders.id=$2;`, [data.status, data.id])
    
    .then((result) => {
      console.log("result after rate parent",result);
      res.send(result.command);
    })
  });
return router;
}