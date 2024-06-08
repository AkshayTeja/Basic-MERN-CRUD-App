//This store is responsible for handling all auth stuff

//Use npm install --save zustand, to get the library
//Used for state management rather than redux
//This file is responsible for handling all states associated with notes and functions that update state
//Before moving everything here, we had all in App.js, now we refactor

import { create } from "zustand";
import axios from "axios";
import SignupForm from "../components/SignupForm";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  signupForm: {
    email: "",
    password: "",
  },

  updateSignupForm: (e) => {
    const  {name,value} = e.target;

    set((state) => {
        return {
            signupForm: {
                ...state.signupForm,
                [name]: value,
            },
        };
    });
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

    const {loginForm} = authStore.getState();

    const res = await axios.post("/login",loginForm, {withCredentials: true});

    //Correct credentials has been verified, so procedd
    set({loggedIn: true});

    //console.log(res);
  },

  checkAuth: async() => {
    try{
      await axios.get("/check-auth",{withCredentials: true});
      set({loggedIn: true});
    }
    catch(err){
      set({loggedIn: false});
    }
  },

  signup: async () => {
    const {signupForm} = authStore.getState();
    
    const res = await axios.post("/signup",signupForm,{withCredentials: true,});
    console.log(res);
  },

}));

export default authStore;