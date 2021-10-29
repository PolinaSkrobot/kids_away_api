const express = require("express");
const router = express.Router();


module.exports=(db)=>{
  router.post("/", (req, res) => {
    console.log('req', req);
    const data = JSON.parse(req.query.order);
    const hours = Number(data.endTime.slice(0,2)) - Number(data.startTime.slice(0,2)); 
    // db.query(`insert into reviews_for_sitter (order_id, comment, rate)
    //  values (1, 'In eleifend quam a odio. In hac habitasse platea dictumst.', 4);
    // ;
    // `,[data.sitter_id, data.date,data.startTime,
    //    data.endTime, hours, data.number, data.address,
    //     data.phone, data.message])
    //   .then((result) => {
    //   console.log("result after insert",result);
    //   res.send(result.command);
    // }); 
  })
return router;
}