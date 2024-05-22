const Note = require("../models/note");

const fetchNotes = async (req,res) => {

    //Find the notes
    const notes = await Note.find(); 

    //Respond with them
    //res.json({ note: note }); //If key, value same, then one of them enough
    res.json({ notes });

};

const fetchSingleNote = async (req,res) => {

    //Get id off the url
    const noteId = req.params.id;

    //Find the note using that id
    const note = await Note.findById(noteId);

    //Respond with the note
    //res.json({ note: note }); //If key, value same, then one of them enough
    res.json({ note });

};

const createNote = async (req,res) => {    
    
    //Get the sent in data off request body
    //const title = req.body.title;
    //const body = req.body.body;
    //Alternate way
    const { title,body } = req.body;

    //Create a note with it
    const note = await Note.create({
        //title: title,
        //body: body,
        title,
        body,
    });

    //res.json({ note: note }); //If key, value same, then one of them enough
    res.json({ note });

};

const updateNote = async (req,res) => {

    //Get the id off the url
    const noteId = req.params.id;

    //Get the data off the request body
    //const title = req.body.title;
    //const body = req.body.body;
    //Alternate way
    const { title,body } = req.body;

    //Find and update the record
    await Note.findByIdAndUpdate(noteId,{
        //title: title,
        //body: body,
        title,
        body,
    });

    //Find updated note
    const note = await Note.findById(noteId);

    //Respond with it
    //res.json({ note: note }); //If key, value same, then one of them enough
    res.json({ note });

};

const deleteNote = async (req,res) => {

    //Get id off url
    const noteId = req.params.id;

    //Delete the record
    await Note.deleteOne({ _id: noteId }); //Use _id instead of id in delete

    //Respond 
    res.json({ success: "Note deleted" });

};

//If anything matches, one entry enough
module.exports = {
    /*fetchNotes: fetchNotes,
    fetchSingleNote: fetchSingleNote,
    createNote: createNote,
    updateNote: updateNote,
    deleteNote: deleteNote,*/
    fetchNotes,
    fetchSingleNote,
    createNote,
    updateNote,
    deleteNote,
};