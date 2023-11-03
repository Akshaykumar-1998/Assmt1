// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAl2I_3mNH_-MEBPtBFYO5KE8ikgURpsEM",
  authDomain: "mtechzillass1.firebaseapp.com",
  projectId: "mtechzillass1",
  storageBucket: "mtechzillass1.appspot.com",
  messagingSenderId: "961077248930",
  appId: "1:961077248930:web:63e22bfe9ff3e5f7c368fb",
  measurementId: "G-JKPJ0QGL6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export{auth,provider}