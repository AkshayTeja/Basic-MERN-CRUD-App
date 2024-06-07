//Use bcrypt library to encrypt password
//Usse jsonwebtoken library to generate jwt
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

    //Send the jwt token



}

function logout(req,res) {

}

module.exports = {
    signup,
    login,
    logout,
};