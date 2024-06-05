//Use npm run start to launch

import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  //useStates
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  //useEffects
  useEffect(() => {
    fetchNotes();
  }, []);

  //Functions
  const fetchNotes = async () => {

    //Fetch notes
    //To do AJAX stuff, use library called axios
    //Axios is popular and easy to use
    const res = await axios.get("http://localhost:3000/notes");

    //Set to state
    setNotes(res.data.notes);

  };

  const updateCreateFormField = (e) => {
    const {name,value} = e.target;

    setCreateForm({
      //Creates duplicates of our object
      ...createForm,
      [name]: value,
    });
    console.log({name,value});
  };

  const createNote = async (e) => {
    //Use below line to stop html page from refreshing contents after submitting form
    e.preventDefault();

    //Create the note
    const res = await axios.post("http://localhost:3000/notes",createForm);

    //Update the state
    setNotes([...notes,res.data.note]);

    //Clear form state, make it empty after clicking submit
    setCreateForm({title:"",body: ""});
  };

  const deleteNote = async (_id) => {

    //Delete the note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);

    //Update the state
    //Filter out the one we deleted
    const newNotes=[...notes].filter((note) => {
      return note._id !== _id
    });

    setNotes(newNotes);

  };

  const handleUpdateFieldChange = (e) => {
    const {name,value} = e.target;

    setUpdateForm({
      //Creates duplicates of our object
      ...updateForm,
      [name]: value,
    });
    console.log({name,value});
  };

  //Pass the whole note, instead of just id like deleteNote
  const toggleUpdate = (note) => {
    //Use below line to get current note values
    //console.log(note);

    //Set state on update form
    setUpdateForm({title: note.title, body: note.body, _id: note._id});

  }

  const updateNote = async (e) => {
    //Use below line to stop html page from refreshing contents after submitting form
    e.preventDefault();

    const {title,body} = updateForm;
    
    //Send update request
    const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`,{title,body});
    //console.log(res);

    //Update state
    const newNotes=[...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setUpdateForm(newNotes);

    //Clear update Form state
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    })
  }


  return (
  <div className="App">

    {/*Display*/}
    <div>
      <h2>Notes: </h2>
      {notes && notes.map(note =>{
        return (<div key={note._id}>

          <h3>{note.title}</h3>

          {/*Without including () => below inside onClick, then function loaded instantly when page loaded*/}
          <button onClick={() => deleteNote(note._id)}>Delete Note</button>

          <button onClick={() => toggleUpdate(note)}>Update Note</button>
          </div>
        );
      })}
    </div>

    {/*Create Note*/}
    {/*Adding !updateForm._id enables us to only show below section when update is not active,
    bascially toggle between update and create*/}
    {!updateForm._id && (<div>
      <h2>Create Note:</h2>
      <form onSubmit={createNote}>
        <input onChange={updateCreateFormField} value={createForm.title} name="title"/>
        <textarea onChange={updateCreateFormField} value={createForm.body} name="body"/>
        <button type="submit">Create Note</button>
      </form>
    </div>)}

    {/*Update Note*/}
    {/*Adding updateForm._id enables us to only show below section when update button is clicked*/}
    {updateForm._id && (<div>
      <h2>Update Note:</h2>
      <form onSubmit={updateNote}>
        <input onChange={handleUpdateFieldChange} value={updateForm.title} name="title"/>
        <textarea onChange={handleUpdateFieldChange} value={updateForm.body} name="body"/>
        <button type="submit">Update Note</button>
      </form>
    </div>)}

  </div>
  );
}

export default App;
