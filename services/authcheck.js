function authCheck(req, res, next){
    if(req.body.id){
        next();
    }
    else{
        res.send('not authorized')
    }
}
module.exports = authCheck