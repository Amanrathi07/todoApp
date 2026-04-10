
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAEUQOBioZq9Pkuq1Z6gfYJN2z7UkuN1wg",
  authDomain: "todoapp-be3d8.firebaseapp.com",
  projectId: "todoapp-be3d8",
  storageBucket: "todoapp-be3d8.firebasestorage.app",
  messagingSenderId: "734026795781",
  appId: "1:734026795781:web:e987114e38d6073898c56c"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();