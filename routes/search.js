const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT users.*, array_agg( DISTINCT '[' || orders.id || ',' || orders.parent_id || ',' || orders.hours ||']') AS orders,
    json_agg(DISTINCT prices.*) AS prices,
    json_agg(DISTINCT availability.*) AS availability
     FROM users
    inner JOIN orders ON users.id = orders.sitter_id
    inner JOIN prices ON users.id = prices.user_id
    inner JOIN availability ON users.id = availability.sitter_id
    WHERE babysitter=true GROUP BY users.id`)
      .then((data)=>{
        res.json(data.rows);
        //console.log(data.rows)
      });  
  });

  router.get("/lang", (req, res) => {
    db.query( `SELECT users.*, array_agg(DISTINCT languages.language::TEXT) AS language,
    array_agg(DISTINCT activities.activity::TEXT) AS activity,
    array_agg(DISTINCT age_groups.age_group::TEXT) AS age
    FROM users
    JOIN users_languages ON users.id = users_languages.user_id
    JOIN languages ON users_languages.language_id = languages.id
    JOIN users_activities ON users.id = users_activities.user_id
    JOIN activities ON users_activities.activity_id = activities.id
    JOIN users_age_groups ON users.id = users_age_groups.user_id
    JOIN age_groups ON users_age_groups.age_group_id = age_groups.id
    WHERE babysitter=true GROUP BY users.id;`)
      .then((data)=>{
        res.json(data.rows);
        //console.log(data.rows)
      });  
  });
  router.get("/act", (req, res) => {
    db.query( `SELECT users.*, array_agg(activities.activity::TEXT) AS activity FROM users
    JOIN users_activities ON users.id = users_activities.user_id
    JOIN activities ON users_activities.activity_id = activities.id
    WHERE babysitter=true GROUP BY users.id;`)
      .then((data)=>{
        res.json(data.rows);
        //console.log(data.rows)
      });  
  });

  router.get("/age", (req, res) => {
    db.query( `SELECT users.*, array_agg(age_groups.age_group::TEXT) AS age FROM users
    JOIN users_age_groups ON users.id = users_age_groups.user_id
    JOIN age_groups ON users_age_groups.age_group_id = age_groups.id
    WHERE babysitter=true GROUP BY users.id;`)
      .then((data)=>{
        res.json(data.rows);
        //console.log(data.rows)
      });  
  });

  router.put("/", (req, res) => {

    const data = req.body;

    db.query(
      `
      SELECT users.*, array_agg(languages.language::TEXT) AS language FROM users
      JOIN users_languages ON users.id = users_languages.user_id
      JOIN languages ON users_languages.language_id = languages.id
      WHERE babysitter=true GROUP BY users.id;
      `,
        [data]
      )
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => console.log(err.massage));
  });


  return router;
};