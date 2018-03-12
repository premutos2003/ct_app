var express = require('express');
var router = express.Router();
var fs = require('fs');
var axios =require("axios")

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.query["platform"],req.query["acc_key"],req.query["acc_sec"])
    res.send("OK")
    })

module.exports = router;
