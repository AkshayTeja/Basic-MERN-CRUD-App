import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState(null);

  //Anything put in here, will run when app starts
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    //Fetch notes
    const res = await axios.get("http://localhost:3000/notes");
    //Set to state
    setNotes(res.data.notes);
    console.log(res);

  }

  return <div className="App">
    <div>
      <h2>Notes:</h2>
      {notes && notes.map((note) => {
        return (
        <div key={note._id}>
          <h3>{note.title}</h3>
        </div>
        );
      })}

    </div>
  </div>;

}

export default App;
