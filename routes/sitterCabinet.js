const express = require("express");
const router = express.Router();
const { startOfWeek, endOfWeek, eachDayOfInterval, add, formatLong } = require ('date-fns');


 const date = new Date('2021-11-03')
// console.log(date);
 const start = startOfWeek(date, {weekStartsOn: 0});
 const end = endOfWeek(date, {weekStartsOn: 0});

module.exports = (db) => {
  // let curr = new Date(); // get current date
  // const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  // const second = first + 1;
  // const third = first + 2;
  // const fourth = first + 3;
  // const fifth = first + 4;
  // const sixth = first + 5;
  // const last = first + 6; // last day is the first day + 6

  // curr = new Date();
  // const monday = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  // curr = new Date();
  // const tuesday = new Date(curr.setDate(second)).toISOString().slice(0, 10);
  // curr = new Date();
  // const wednesday = new Date(curr.setDate(third)).toISOString().slice(0, 10);
  // curr = new Date();
  // const thursday = new Date(curr.setDate(fourth)).toISOString().slice(0, 10);
  // curr = new Date();
  // const friday = new Date(curr.setDate(fifth)).toISOString().slice(0, 10);
  // curr = new Date();
  // const saturday = new Date(curr.setDate(sixth)).toISOString().slice(0, 10);
  // curr = new Date();
  // const lastday = new Date(curr.setDate(last)).toISOString().slice(0, 10);
  // const arrWeek = [
  //   monday,
  //   tuesday,
  //   wednesday,
  //   thursday,
  //   friday,
  //   saturday,
  //   lastday,
  // ];
const arrWeek = eachDayOfInterval({
  start: new Date(start),
  end: new Date(end)
})  
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
        for (let day of daysFromDB) {
          //let date = day.date.toISOString().slice(0,10);
          let date = day.date
          console.log("from base",date)
          console.log(day_w)
          console.log("------")
          
          if (date.toString() == day_w.toString()) {
            console.log("day1:",day)
            let day2 = day;
            console.log("start time1 ",day2.start_time)
            console.log("start time2 ",day2.start_time.toLocaleString('ca-Ca',{hourCycle: 'h24'}))
            day2.start_time=day.start_time.toLocaleString('ca-Ca',{hourCycle: 'h24'}).slice(11,23)
            day2.end_time=day.end_time.toLocaleString('ca-Ca',{hourCycle: 'h24'}).slice(11,23)
            console.log("day2:",day2)
            console.log("-----")
            arrToPass.push(day2);
            find=true;
          break
          }
        }
        if (!find) {
        arrToPass.push({date: day_w, start_time: '', end_time: "", booked: false, order_id: null})
        }
      }
      console.log("arrToPass",arrToPass);
   
      res.json(arrToPass);
    });
    
  });
  router.post('/', (req,res)=>{
    console.log(req.query.schedule);
    const data = req.query.schedule;
    const arrParsed=[]
    for (let i=0; i<=6;i++) {
      
      arrParsed.push(JSON.parse(data[i]));
      let start_time = arrParsed[i].start_time.slice(0,2);
      if (start_time[0]=="0"){
        start_time=start_time[1]
      }
      let end_time = arrParsed[i].end_time.slice(0,2);
      if (end_time[0]=="0"){
        end_time=end_time[1]
      }
      let new_start_time=add(new Date(arrParsed[i].date), {
        hours: start_time
      })
      //arrParsed[i].start_time=new_start_time
     
      let new_end_time=add(new Date(arrParsed[i].date), {
        hours: end_time
      })
      //arrParsed[i].end_time=new_end_time
      let update=false;
      console.log("select param:",arrParsed[i].date.toString().slice(0,10))
      db.query(`select from availability where sitter_id = 6 and date = $1;`
      , [arrParsed[i].date.toString().slice(0,10)])
        .then((db_data) => {
        console.log("select from availability where sitter_id = 6 and date = $1;",db_data);
        if (db_data.rowCount>0) {
          update = true;
          console.log('updated!')
        }
        if (update === false){
          db.query(
            `
            insert into availability (sitter_id, date, start_time, end_time, booked, order_id)
            values (6,$1, $2, $3,false,NULL);
            `
            , [arrParsed[i].date, new_start_time, new_end_time]).catch((e)=>console.log(e))
            console.log("inserting")
        }  
        else{
          db.query(
            `
            UPDATE availability
            SET date = $1,
            start_time = $2,
            end_time = $3
            WHERE sitter_id=6 and date =$1;
            `
            , [arrParsed[i].date.toString().slice(0,10), new_start_time, new_end_time]).catch((e)=>console.log(e))
            console.log("updatinf query, start time:",new_start_time)
        }
     
      })
      .catch((err) => console.log(err.massage));
     

      
    }
    
  })
  return router;
};

// const selet='booked, date,
// start_time at time zone 'utc' at time zone 'pst' AS start_time,
// end_time at time zone 'utc' at time zone 'pst' AS end_time'
