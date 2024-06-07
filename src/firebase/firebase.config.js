// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmwaZ2g0rGkDUKtpwFaojlWuzhM2bemKE",
  authDomain: "fir-email-pass-auth-react.firebaseapp.com",
  projectId: "fir-email-pass-auth-react",
  storageBucket: "fir-email-pass-auth-react.appspot.com",
  messagingSenderId: "244857196348",
  appId: "1:244857196348:web:5e99a95f869bf1cf4bd839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;