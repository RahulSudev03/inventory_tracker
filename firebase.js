// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClvVWco_jj4tnBvrFrVI5MF0Ta5LWYCeY",
    authDomain: "inventory-management-5a379.firebaseapp.com",
    projectId: "inventory-management-5a379",
    storageBucket: "inventory-management-5a379.appspot.com",
    messagingSenderId: "276931631365",
    appId: "1:276931631365:web:3351e22002d68c4c9dff6c",
    measurementId: "G-PDD06SH4X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }