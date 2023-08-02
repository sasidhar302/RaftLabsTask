let mongoose =  require('mongoose');
let user  = mongoose.model('users');
let CryptoJS = require("crypto-js");
const ObjectId = mongoose.Types.ObjectId;

module.exports = (function(){
    return {
        getUsers: async function(req, res){
            try {
                let userlist = await user.find({});
                console.log(userlist)
                userlist.forEach((result)=>{
                    id = new ObjectId(result._id).toString()
                    result._id = CryptoJS.AES.encrypt(id, 'secret key 123').toString();
                    result.password = CryptoJS.AES.encrypt(result.password, 'secret key 123').toString();
                })
                console.log(userlist)
                res.json(userlist)
            }
            catch(e){
                console.log(e)
            }
        },
        saveNewUser: async function(req,res){
            console.log(req.body)
            let users = new user(req.body)
            console.log(users)
            try {
                let result = await users.save();
                res.send(result)
            }
            catch(e){
                res.send(e)
            }
        },
        UpdateUser: async function(req,res){

            let result = await user.findById({'_id':req.body._id});
            try {
                result.username = req.body.username
                let info = await result.save();
                res.send(info)
            }
            catch(e){
                res.send(e)
            }
        },
        removeUser: async function(req,res){
     
            try {
                console.log(req.params)
                let result = await user.findByIdAndRemove({'_id':req.params.id});
                console.log(result)
                res.json(result)
            }
            catch(e){
                res.send(e)
            }
        },      
    }
})();



