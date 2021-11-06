const express = require("express");
const router = express.Router();
const {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  add
} = require("date-fns");

const date = new Date();
const start = startOfWeek(date, { weekStartsOn: 1 });
const end = endOfWeek(date, { weekStartsOn: 1 });

module.exports = (db) => {

  const arrWeek = eachDayOfInterval({
    start: new Date(start),
    end: new Date(end),
  });

  router.get("/", (req, res) => {
    db.query(
      `SELECT *
    FROM availability
    WHERE sitter_id=6;`
    ).then((data) => {
      const daysFromDB = data.rows;
      const arrToPass = [];
      for (const day_w of arrWeek) {
        let find = false;
        for (let day of daysFromDB) {
          let date = day.date;

          if (date.toString() == day_w.toString()) {
            let day2 = day;
            day2.start_time = day.start_time
              .toLocaleString("ca-Ca", { hourCycle: "h24" })
              .slice(11, 23);
            day2.end_time = day.end_time
              .toLocaleString("ca-Ca", { hourCycle: "h24" })
              .slice(11, 23);
            arrToPass.push(day2);
            find = true;
            break;
          }
        }
        if (!find) {
          arrToPass.push({
            date: day_w,
            start_time: "",
            end_time: "",
            booked: false,
            order_id: null,
          });
        }
      }

      res.json(arrToPass);
    });
  });
  router.post("/", (req, res) => {
    const data = req.query.schedule;
    const arrParsed = [];
    for (let i = 0; i <= 6; i++) {
      arrParsed.push(JSON.parse(data[i]));//parse time to needed format
      let start_time = arrParsed[i].start_time.slice(0, 2);
      if (start_time[0] == "0") {
        start_time = start_time[1];
      }
      let end_time = arrParsed[i].end_time.slice(0, 2);
      if (end_time[0] == "0") {
        end_time = end_time[1];
      }
      let new_start_time = add(new Date(arrParsed[i].date), {
        hours: start_time,
      });

      let new_end_time = add(new Date(arrParsed[i].date), {
        hours: end_time,
      });
      let update = false;
      db.query(`select from availability where sitter_id = 6 and date = $1;`, [//
        arrParsed[i].date.toString().slice(0, 10),
      ])
        .then((db_data) => {
            if (db_data.rowCount > 0) {//check if that date already exist in db
            update = true;
          }
          if (update === false) {//if not exist then insert data
            db.query(
              `
            insert into availability (sitter_id, date, start_time, end_time, booked, order_id)
            values (6,$1, $2, $3,false,NULL);
            `,
              [arrParsed[i].date, new_start_time, new_end_time]
            ).catch((e) => console.log(e));
          } else {//udpate row
            db.query(
              `
            UPDATE availability
            SET date = $1,
            start_time = $2,
            end_time = $3
            WHERE sitter_id=6 and date =$1;
            `,
              [
                arrParsed[i].date.toString().slice(0, 10),
                new_start_time,
                new_end_time,
              ]
            ).catch((e) => console.log(e));
          }
        })
        .catch((err) => console.log(err.massage));
    }
  });
  return router;
};

