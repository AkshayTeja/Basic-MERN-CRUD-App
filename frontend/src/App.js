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

  }

  const updateCreateFormField = (e) => {
    const {name,value} = e.target;
  };

  return (
  <div className="App">

    {/*Display Note*/}
    <div>
      <h2>Notes: </h2>
      {notes && notes.map(note =>{
        return <div key={note._id}>
          <h3>{note.title}</h3>
          </div>
      })}
    </div>

    {/*Create Note*/}
    <div>
      <h2>Create Note:</h2>
      <form>
        <input onChange={updateCreateFormField} value={createForm.title} name="title"/>
        <textarea onChange={updateCreateFormField} value={createForm.body} name="body"/>
        <button type="submit">Create Note</button>
      </form>
    </div>



  </div>
  );

}

export default App;
