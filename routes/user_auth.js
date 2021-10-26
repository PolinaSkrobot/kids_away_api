// const express = require("express");
// const router = express.Router();

// module.exports = (db) => {
//   router.get("/parent", (req, res) => {
//     // Select the first user in users table as the logged user
//     let query = `SELECT id FROM users WHERE babysitter=FALSE LIMIT 1`;
//     db.query(query)
//       .then((data) => {
//         const cookies = data.rows;
//         // Set the cookie and send it back to the browser
//         res.cookie("user_id", cookies[0].id);
//         // Send the app user to the categorizer
//         console.log("jjj", data.rows);
//         //res.redirect("categories");
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });
//   return router;
// };