let express = require('express');
let userctr = require('../controllers/usercontroller');
let authCheck = require('../services/authcheck');
let jwt = require('jsonwebtoken');
let CryptoJS = require("crypto-js");




module.exports = function(app){
    app.get('/getusers',authCheck,function(req, res){
        userctr.getUsers(req,res);
    }); 
    app.post('/saveuser',authCheck,function(req, res){
        userctr.saveNewUser(req,res);
    })
    app.put('/updateuser',authCheck,function(req, res){
        userctr.UpdateUser(req,res);
    })
    app.delete('/deleteuser',authCheck,function(req, res){
        userctr.removeUser(req,res);
    })



    app.post('/getPassword',(req,res)=>{
      let bytes  = CryptoJS.AES.decrypt(req.body.password, 'secret key 123');
      let password  = bytes.toString(CryptoJS.enc.Utf8);
      console.log(password);
      res.send(password)
    })

  }