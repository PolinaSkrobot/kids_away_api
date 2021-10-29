const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.post("/", (req, res) => {
    const data = JSON.parse(req.query.order);
    const hours = Number(data.endTime.slice(0,2)) - Number(data.startTime.slice(0,2)); 
    db.query(`insert into orders
    (parent_id, sitter_id, status, date, start_time, end_time, hours, num_of_kids, address, contact_phone, comment)
     values (1, $1, 'created', $2, $3, $4, $5, $6, $7, $8, $9);
    `,[data.sitter_id, data.date,data.startTime,
       data.endTime, hours, data.number, data.address,
        data.phone, data.message])
      .then((result) => {
      console.log("result after insert",result);
      res.send(result.command);
    })  
  })
return router;
}