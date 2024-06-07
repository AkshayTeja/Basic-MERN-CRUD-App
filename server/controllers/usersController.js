//Use bcrypt library to encrypt password
//Use jsonwebtoken library to generate jwt
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function signup(req,res) {

    try{
        //Get the email,password off the req body
        const {email,password} = req.body;

        //Hash password
        const hashedPassword = bcrypt.hashSync(password,8);

        //Create user with that data
        await User.create({email,password: hashedPassword});

        //Respond
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(400);
    }
    
    
}

async function login(req,res) {

    try{
        //Get email and password off request body
        const {email,password} = req.body;

        //Find user with requested email
        //find One returns the first user that matches the condition we put in our object
        const user = await User.findOne({email});
        if(!user) return res.sendStatus(401);

        //Compare sent in password with found user's password hash
        //Below line returns true or false
        const passwordMatch = bcrypt.compareSync(password,user.password);
        if(!passwordMatch) return res.sendStatus(401);

        //Create a jwt token, jwt is json web token is a standardized way to securely send data between two parties. 
        //They contain information (claims) encoded in the JSON format.
        //These claims help share specific details between the parties involved.

        //sub is subject which user's id, exp is expiration timer that gives number of milliseconds since 1970
        //For example, Expire in 30 days=Date.now() + 1000*60*60*24*30, convert from ms
        const exp = Date.now() + 1000*60*60*24*30;
        //Below is for 10 seconds, after which cookie expires
        //const exp = Date.now() + 1000*10; 
        const token = jwt.sign({sub: user._id,exp},process.env.SECRET); 

        //Set the cookie
        res.cookie("Authorization",token, { //Authorization is the name of the cookie
            expires: new Date(exp),
            httpOnly: true, //Means only browser and server can read the cookie
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production", //Makes it only work on https
        });

        //Send the jwt token

        //Unhealthy habit to do this as user will store token in local storage
        // res.json({token});
        //Instead send using HTTP cookie
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(400);
    }
}

function logout(req,res) {

    try{
        //Delete the cookie
        res.clearCookie("Authorization");

        //Respond with 200
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(400);
    }
    
    
}

function checkAuth(req,res){

    try{
        //We can see user details in console
        //console.log(req.user);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(400);
    }
    
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
};