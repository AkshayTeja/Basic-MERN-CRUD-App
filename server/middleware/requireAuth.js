const jwt = require("jsonwebtoken");
const User = require("../models/user");

//They call it middleware because this function runs in between the path they are requesting and the controller function
async function requireAuth(req,res,next){

    try{
        //Read token off cookies
        const token = req.cookies.Authorization;

        //Decode the token
        const decoded = jwt.verify(token,process.env.SECRET);

        //Check expiration
        if(Date.now() > decoded.exp) return res.sendStatus(401);

        //Find user using decoded sub (user._id)
        const user = await User.findById(decoded.sub);
        if(!user) return res.sendStatus(401);

        //Attach user to req
        req.user=user;

        //Just use to check if middleware working or not
        //console.log('In middleware');

        //Continue on
        next();
    }
    catch(err)
    {
        return res.sendStatus(401);
    }
}

module.exports = requireAuth;