/**
 * Created by alessandrofurkim on 22.02.18.
 */
var express = require('express');
var router = express.Router();
var db = require("../db/db")

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.getAllUsers().then((response)=>{
        res.json(response);
    })
});

module.exports = router;
