//Load env variables
//Include below if block, because when project deployed on heroku etc,
//they have their own variables, so only use this locally
//So this way when we deploy somewhere, env not loaded
if(process.env.NODE_ENV != 'production')
{
    require("dotenv").config();
}

//Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");

//Create an express app
const app = express();

//Connect to database
connectToDb();

//Routing
app.get('/',(req,res) => {
    res.json({ hello: "world" });
});

//Start our server
app.listen(process.env.PORT);