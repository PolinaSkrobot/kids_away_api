const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {//pass full info and activities for specific babysitter
    id = req.params.id;
    let user_prof = {};
    let review = [];
    Promise.all([
      db.query(
        `SELECT users.*, array_agg( DISTINCT '[' || orders.id || ',' || orders.parent_id || ',' || orders.hours ||']') AS orders,
      json_agg(DISTINCT prices.*) AS prices,
      json_agg(DISTINCT availability.*) AS availability
       FROM users
      JOIN orders ON users.id = orders.sitter_id
      JOIN prices ON users.id = prices.user_id
      JOIN availability ON users.id = availability.sitter_id
      WHERE users.id=$1 GROUP BY users.id`,
        [id]
      ),
      db.query(
        `select reviews_for_sitter.comment, users.first_name as parent_name, reviews_for_sitter.rate
        from reviews_for_sitter
        JOIN orders ON reviews_for_sitter.order_id = orders.id
        JOIN users ON orders.parent_id = users.id
        WHERE sitter_id = $1`,
        [id]
      ),
    ]).then((data) => {
      user_prof = data[0].rows;
      review = data[1].rows;
      res.json({ user_prof, review });
    });
  });
  return router;
};
