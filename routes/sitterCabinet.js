const express = require("express");
const router = express.Router();

module.exports=(db)=>{
  router.get("/", (req, res) => {
    db.query(`SELECT *
    FROM availability
    WHERE sitter_id=6;`)
      .then((data)=>{
        console.log("hbfjeb")
        res.json(data.rows);
      });  
  });
return router;
}

// const selet='booked, date,
// start_time at time zone 'utc' at time zone 'pst' AS start_time,
// end_time at time zone 'utc' at time zone 'pst' AS end_time'