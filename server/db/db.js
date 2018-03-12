/**
 * Created by alessandrofurkim on 22.02.18.
 */
var loki = require("lokijs")
var db_loki = new loki('./db.json',{
    autosave: true,
    autoload: true,
    autoloadCallback: loadHandler,
    autosaveInterval: 4000,
})
var users;
var apps;

if(db_loki.getCollection('users')==null){
    users = db_loki.addCollection('users')
}
else{
    users = db_loki.getCollection('users')
}
if(db_loki.getCollection('apps')==null)
{
    apps = db_loki.addCollection('apps')
}
else {
    apps= db_loki.getCollection('apps')
}



exports.deleteUser = function deleteUser(user){
    return new Promise((res,rej)=>{
        console.log(user["value"])
        res(users.findAndRemove({name:user["value"]}))
    }).catch((err)=>{
        console.log(err)
    })

}

exports.insertUser = function insertUser(user){
    return new Promise((res,rej)=>{
        res(users.insert(user))
    }).catch((err)=>{
        console.log(err)
    })
}
exports.insertApp = function insertUser(app){
    return new Promise((res,rej)=>{
        res(apps.insert(app))
    }).catch((err)=>{
        console.log(err)
    })
}

exports.findUser = function findUser(prop){
    console.log(prop,"TO FIND")
    return new Promise((res,rej)=>{
      res(users.find({name:prop}))
    }).catch((err)=>{
        console.log(err)
    })
}

exports.getAllUsers = function getAllUsers(){
    return new Promise((res,rej)=>{
        console.log(users.data)
      res(users.data)
    }).catch((err)=>{
        console.log(err)
    })
}
exports.getAllApps = function getAllUsers(){
    return new Promise((res,rej)=>{
        console.log(apps.data)
      res(apps.data)
    }).catch((err)=>{
        console.log(err)
    })
}

function loadHandler() {
    users = db_loki.getCollection('users')
    console.log("connected")
}

