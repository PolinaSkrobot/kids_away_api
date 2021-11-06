const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT users.*, json_agg( DISTINCT orders.*) AS orders,
    json_agg(DISTINCT prices.*) AS prices,
    json_agg(DISTINCT availability.*) AS availability,
    array_agg(DISTINCT age_groups.age_group::TEXT) AS age_group, 
    array_agg(DISTINCT languages.language::TEXT) AS language
     FROM users
      JOIN users_languages ON users.id = users_languages.user_id
      JOIN languages ON users_languages.language_id = languages.id
    inner JOIN orders ON users.id = orders.sitter_id
    inner JOIN prices ON users.id = prices.user_id
    inner JOIN availability ON users.id = availability.sitter_id
    JOIN users_age_groups ON users.id = users_age_groups.user_id
    JOIN age_groups ON users_age_groups.age_group_id = age_groups.id
    WHERE babysitter=true GROUP BY users.id`)
      .then((data)=>{
        res.cookie("user_id", 1);
        res.json(data.rows);
      });  
  });

   return router;
};