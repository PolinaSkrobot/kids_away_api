const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const data = JSON.parse(req.query.order);
    Promise.all([
      db.query(
        `DELETE FROM orders
      WHERE orders.id = $1;
      `,
        [data.id]
      ),
    ]).then((result) => {
      res.send([result[0].command]);
    });
  });
  return router;
};
