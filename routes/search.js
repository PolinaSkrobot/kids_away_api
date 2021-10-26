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
        res.cookie("user_id", 1);
        res.json(data.rows);
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