var express = require('express');
var router = express.Router();
var db = require("../db/db")

/* GET users listing. */
router.post('/', function(req, res, next) {
    let date =new Date()
    console.log(req.body)
  db.insertUser({
      name:req.body["name"],
      password:req.body["password"],
      role:req.body["role"],
      cloud:{
          AWS:req.body["AWS"],
          GCP:req.body["GCP"]
      },
      created:date.toLocaleDateString()+"-"+date.toLocaleTimeString(),
      updated:date.toLocaleDateString()+"-"+date.toLocaleTimeString(),
    }).then((response)=>{
      res.send(response);
  })
});

module.exports = router;