var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET users listing. */
router.get('/', function(req, res, next) {
        try{let state =  JSON.parse(fs.readFileSync("../server//db.json"))
            console.log(state)
            if(state["collections"][0]["data"].length>0){res.send({status:"ready"})}
            else{
              console.log("Initial Setup")
              res.send({status:"initial"})}
        }
        catch(e){
          console.log(e)
            res.send({status:"initial"})
        }


    })

module.exports = router;
