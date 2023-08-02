let  mongoose = require('mongoose');


const url = "mongodb+srv://"+process.env.USER_NAME+":"+process.env.PASSWORD+"@cluster0.cnrbjoz.mongodb.net/ecom?retryWrites=true&w=majority";
   //console.log(url)

try {
    mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true});    
    }catch (error) { 
    console.log("could not connect");    
    }
    const dbConnection = mongoose.connection;
    dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
    dbConnection.once("open", () => console.log("Connected to DB!"));


require('../models/users.js');