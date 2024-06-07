//Use npm run dev to launch

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
const cors = require("cors");  //Use to accept requests from any domain
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesControllers");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

//Create an express app
const app = express();

//Configure express app to read json off request body
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser());

//Connect to database
connectToDb();

//Routing

//Routing example
/*app.get("/",(req,res) => {      //get to retrieve something
    res.json({ hello: "world" });
});*/

//For users
app.post("/signup",usersController.signup);
app.post("/login",usersController.login);
app.get("/logout",usersController.logout);

//Using middleware
//When check-auth is hit, run require-auth and check if logged in and if token's valid
//If not, return early and send a 401
//Else call next and move on to check-auth controller function
app.get("/check-auth",requireAuth,usersController.checkAuth);

//Get all notes
app.get("/notes", notesController.fetchNotes);
//Get single note based on id
app.get("/notes/:id", notesController.fetchSingleNote);
//Create note
app.post("/notes",notesController.createNote); //Use post to create something
//Update note
app.put("/notes/:id", notesController.updateNote);
//Delete note
app.delete("/notes/:id", notesController.deleteNote);

//Start our server
app.listen(process.env.PORT);