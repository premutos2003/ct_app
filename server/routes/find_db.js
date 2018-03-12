var express = require('express');
var router = express.Router();
var db = require("../db/db")

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = db.findUser({prop:req.query["prop"],value:req.query["value"]})
  res.send('returned Users:',users);
});

module.exports = router;
