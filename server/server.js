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
const Note = require("./models/note");

//Create an express app
const app = express();

//Configure express app to read json off request body
app.use(express.json());

//Connect to database
connectToDb();

//Routing
app.get("/",(req,res) => {      //get to retrieve something
    res.json({ hello: "world" });
});

//Get all notes
app.get("/notes", async (req,res) => {
    //Find the notes
    const notes = await Note.find(); 
    //Respond with them
    res.json({ notes: notes });
});

//Get single note based on id
app.get("/notes/:id", async (req,res) => {
    //Get id off the url
    const noteId = req.params.id;
    //Find the note using that id
    const note = await Note.findById(noteId);
    //Respond with the note
    res.json({ note: note });
});

//Create note
app.post("/notes", async (req,res) => {    //post to create something
    //Get the sent in data off request body
    const title = req.body.title;
    const body = req.body.body;

    //Create a note with it
    const note = await Note.create({
        title: title,
        body: body,
    });

    //Respond with the new note
    res.json({ note: note });
})

//Update note
app.put("/notes/:id", async (req,res) => {
    //Get the id off the url
    const noteId = req.params.id;
    //Get the data off the request body
    const title = req.body.title;
    const body = req.body.body;
    //Find and update the record
    await Note.findByIdAndUpdate(noteId,{
        title: title,
        body: body,
    });
    //Find updated note
    const note = await Note.findById(noteId);

    //Respond with it
    res.json({ note: note});
});

//Start our server
app.listen(process.env.PORT);