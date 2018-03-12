var express = require('express');
var router = express.Router();
var db = require("../db/db")

/* GET users listing. */
router.post('/', function(req, res, next) {
  db.deleteUser({prop:req.query["prop"],value:req.query["value"]})
      .then((response)=>{
          res.send(response);
      })
});

module.exports = router;
