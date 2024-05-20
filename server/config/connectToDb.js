//Load env variables
//Include below if block, because when project deployed on heroku etc,
//they have their own variables, so only use this locally
//So this way when we deploy somewhere, env not loaded
if(process.env.NODE_ENV != 'production')
{
    require("dotenv").config();
}

const mongoose = require("mongoose");

async function connectToDb(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database");
    }
    catch(err){
        console.log(err);
    }  
}

module.exports = connectToDb;