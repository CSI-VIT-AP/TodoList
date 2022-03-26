import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    // add code here
    apiKey: "AIzaSyCTIptOc54oJkSJeatmM549t9QnC8ZGcEg",
  authDomain: "todolist-9c098.firebaseapp.com",
  databaseURL: "https://todolist-9c098-default-rtdb.firebaseio.com/",
  projectId: "todolist-9c098",
  storageBucket: "todolist-9c098.appspot.com",
  messagingSenderId: "995813157929",
  appId: "1:995813157929:web:e842f3e77a72890dd90038",
  measurementId: "G-MBQ3DJTQD3"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
