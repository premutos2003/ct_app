var express = require('express');
var router = express.Router();
var db = require("../db/db")

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body["name"])
  db.insertApp({
        app_id:req.body["app_id"],
        stack:req.body["stack"],
        provider:req.body["provider"],
        type:req.body["type"],
        env:req.body["env"],
        git:req.body["git"],
        created:req.body["created"],
        last:req.body["last"],

  }).then((response)=>{
      res.send(response);
  })
});

module.exports = router;