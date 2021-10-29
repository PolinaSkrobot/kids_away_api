const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  const second = first + 1;
  const third = first + 2;
  const fourth = first + 3;
  const fifth = first + 4;
  const sixth = first + 5;
  const last = first + 6; // last day is the first day + 6

  const monday = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  const tuesday = new Date(curr.setDate(second)).toISOString().slice(0, 10);
  const wednesday = new Date(curr.setDate(third)).toISOString().slice(0, 10);
  const thursday = new Date(curr.setDate(fourth)).toISOString().slice(0, 10);
  const friday = new Date(curr.setDate(fifth)).toISOString().slice(0, 10);
  const saturday = new Date(curr.setDate(sixth)).toISOString().slice(0, 10);
  const lastday = new Date(curr.setDate(last)).toISOString().slice(0, 10);
  const arrWeek = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    lastday,
  ];
console.log("arrweek",arrWeek);


  router.get("/", (req, res) => {
    db.query(
      `SELECT *
    FROM availability
    WHERE sitter_id=6;`
    ).then((data) => {
      const daysFromDB=data.rows;
      const arrToPass=[]
      for ( const day_w of arrWeek) {
        let find= false;
        for (const day of daysFromDB) {
          let date = day.date.toISOString().slice(0,10);
          if (date === day_w) {
            arrToPass.push(day);
            find=true;
          break
          }
        }
        if (!find) {
        arrToPass.push({date: day_w + 'T07:00:00.000Z', start_time: '', end_time: "", booked: false, order_id: null})
        }
      }
      console.log("arrToPass",arrToPass);
   
      res.json(arrToPass);
    });
  });
  return router;
};

// const selet='booked, date,
// start_time at time zone 'utc' at time zone 'pst' AS start_time,
// end_time at time zone 'utc' at time zone 'pst' AS end_time'
