//Use bcrypt library to encrypt password
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

function login(req,res) {

    //Get email and password off request body

    //Find user with requested email

    //Compare sent in password with found user's password hash

    //Create a jwt token, jwt is json web token is a standardized way to securely send data between two parties. 
    //They contain information (claims) encoded in the JSON format.
    //These claims help share specific details between the parties involved.

    //Send the jwt token



}

function logout(req,res) {

}

module.exports = {
    signup,
    login,
    logout,
};