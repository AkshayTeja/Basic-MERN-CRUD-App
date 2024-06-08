import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";

export default function NotesPage() {

    //Use the store via zustand
    const store = notesStore();

    //useEffects
    useEffect(() => {
        store.fetchNotes();
    }, []);

  return (
    <div>
    {/*Display*/}
    <Notes/>

    {/*Create Note*/}
    <CreateForm/>

    {/*Update Note*/}
    <UpdateForm/>
    </div>
  );
}
