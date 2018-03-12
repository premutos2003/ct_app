var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var jenkins_running = false
/* GET users listing. */
router.get('/', function(req, res, next) {
    if(jenkins_running==false){
        console.log("start process : jenkins init")
        new Promise((resolve,reject)=>{
            resolve(exec("docker run -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock  jenkinso:latest", function(error, stdout, stderr) {
                if (!error) {
                    console.log("Jenkins worker server successfully started")
                } else {
                    console.log(error,"Something went wrong with setting up Jenkins")
                    res.error("ERROR")
                }
            }));
        }).then(()=>{
            jenkins_running = true
            new Promise((reso,rejo)=>{
              setTimeout(reso,10000)
            }).then(()=>{
                console.log("JENKINS UP AND RUNNING")
                res.send('Jenkins up and running!')})
            })
    }
    else {
        res.status(400)
        res.send("Jenkins is already running on port 8080")}


});

module.exports = router;
