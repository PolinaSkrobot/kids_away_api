const express = require("express");
const router = express.Router();

module.exports=()=>{
  router.get('/', (req, res) => {
    //res.cookie("user_id", 1);
    res.send('Hello World')
  });
return router;
}