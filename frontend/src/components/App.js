//Use npm run start to launch, run server first, then frontend

import { useState, useEffect } from "react";
import axios from "axios";
import notesStore from "../stores/notesStore";
import Notes from "./Notes";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

function App() {

  //Use the store via zustand
  const store = notesStore();

  //useEffects
  useEffect(() => {
    store.fetchNotes();
  }, []);

  
  return (
  <div className="App">

    {/*Display*/}
    <Notes/>

    {/*Create Note*/}
    <CreateForm/>

    {/*Update Note*/}
    <UpdateForm/>
    

  </div>
  );
}

export default App;
