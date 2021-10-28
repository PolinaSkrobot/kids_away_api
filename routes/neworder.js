const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.post("/", (req, res) => {
    console.log("----------",req);
    const data = JSON.parse(req.query.order);
    console.log("data___", data);
    const hours = Number(data.endTime.slice(0,2)) - Number(data.startTime.slice(0,2)); 
    console.log(hours);
    // db.query(`insert into orders
    // (parent_id, sitter_id, status, date, start_time, end_time, hours, num_of_kids, address, contact_phone, comment)
    //  values (6, $1, 'created', $2, $3, $4, 2, 3, '54 Barby Hill', '479-911-5474', '');
    // `,[data.sitter_id, data.date,data.start_time, data.end_time, ])
    //   .then((data)=>{
    //     console.log("hbfjeb")
    //     res.json(data.rows);
    //   });  
  });
return router;
}