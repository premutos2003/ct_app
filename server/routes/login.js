/**
 * Created by alessandrofurkim on 22.02.18.
 */
var express = require('express');
var router = express.Router();
var db = require("../db/db")

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.findUser(req.query["user"]).then((response)=>{
        console.log(response)
        if(response.length>0){
            console.log(response)
            console.log(req.query["pw"])
            if(response[0].password==req.query["pw"]){
                res.status(200)
                res.send("Login Sucessful")
            }
            else{
                res.status(403)
                res.send("Password incorrect")
            }
        }
        else{
            res.status(400)
            res.send("User does not exist")
        }
    })
});

module.exports = router;
