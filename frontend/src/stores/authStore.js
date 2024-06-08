//This store is responsible for handling all auth stuff

//Use npm install --save zustand, to get the library
//Used for state management rather than redux
//This file is responsible for handling all states associated with notes and functions that update state
//Before moving everything here, we had all in App.js, now we refactor

import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loginForm: {
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const  {name,value} = e.target;

    set((state) => {
        return {
            loginForm: {
                ...state.loginForm,
                [name]: value,
            },
        };
    });
  },

   login: async (e) => {
    e.preventDefault();

    const {loginForm} = authStore.getState();

    const res = await axios.post("/login",loginForm, {withCredentials: true});
    console.log(res);
  },

}));

export default authStore;