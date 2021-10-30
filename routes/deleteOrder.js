const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.post("/", (req, res) => {
    console.log("delete", req.query);
    const data = JSON.parse(req.query.order); 
    console.log("delete data", data);
    Promise.all([
      db.query(`
      DELETE FROM orders
      WHERE orders.id = $1;
      `, [data.id])
   ]
    )   
    .then((result) => {
      console.log("result after deletion",result);
      res.send([result[0].command]);
    })
  });
return router;
}