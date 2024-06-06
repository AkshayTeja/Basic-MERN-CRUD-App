//Use npm install --save zustand, to get the library
//Used for state management rather than redux
//This file is responsible for handling all states associated with notes and functions that update state
//Before moving everything here, we had all in App.js, now we refactor

import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,

createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    //Fetch notes
    //To do AJAX stuff, use library called axios
    //Axios is popular and easy to use
    const res = await axios.get("http://localhost:3000/notes");

    //Set to state
    //setNotes(res.data.notes); Just use below thing instead of this, in zustand
    set({notes: res.data.notes});

  },

  updateCreateFormField: (e) => {
    const {name,value} = e.target;

    set((state) => {
        return {
            //Creates duplicates of our object
            createForm: {
                ...state.createForm,
                [name]: value,
            },
        };
    });

  },

  createNote: async (e) => {
    //Use below line to stop html page from refreshing contents after submitting form
    e.preventDefault();

    const {createForm, notes} = notesStore.getState();

    //Create the note
    const res = await axios.post("http://localhost:3000/notes",createForm);

    //Update the state
    //Clear form state, make it empty after clicking submit
    set ({
        notes: [...notes,res.data.note],
        createForm: {
            title: "",
            body: "",
        },
    });
  },

  deleteNote: async (_id) => {

    //Delete the note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);

    const { notes } = notesStore.getState();
    //Update the state
    //Filter out the one we deleted
    const newNotes=notes.filter((note) => {
      return note._id !== _id;
    });

    set({notes: newNotes});
  },

  handleUpdateFieldChange: (e) => {
    const {name,value} = e.target;

    set((state) => {
        return {
            updateForm: {
                //Creates duplicates of our object
                ...state.updateForm,
                [name]: value,
            },
        };
    });
  },

  toggleUpdate: ({_id,title,body}) => {
    //Use below line to get current note values
    //console.log(note);

    //Set state on update form
    set({
        updateForm: {
            title,
            body, 
            _id,
        },
    });
  },

  updateNote: async (e) => {
    //Use below line to stop html page from refreshing contents after submitting form
    e.preventDefault();

    const {updateForm: {title,body,_id},notes} = notesStore.getState();
    
    //Send update request
    const res = await axios.put(`http://localhost:3000/notes/${_id}`,{title,body});
    //console.log(res);

    //Update state
    const newNotes=[...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNotes[noteIndex] = res.data.note;

    set({
        notes: newNotes,
        //Clear update Form state
        updateForm: {
            _id: null,
            title: "",
            body: "",
        },
    });
  },

}));

export default notesStore;