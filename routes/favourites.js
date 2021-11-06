const express = require("express");
const router = express.Router();

module.exports=(db)=>{//not used yet
  router.get("/", (req, res) => {
    db.query(`SELECT users.id, users.first_name, users.photo FROM users
    JOIN favourites ON users.id = favourites.sitter_id
    WHERE parent_id=$1 GROUP BY users.id;`,[req.query.user_id])
      .then((data)=>{
        res.json(data.rows);
      });  
  });
return router;
}