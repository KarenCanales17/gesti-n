// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsSujIYeaqgiu8GjbmktUUelj9hw22P8E",
  authDomain: "gestion-proyecto-c0fa9.firebaseapp.com",
  projectId: "gestion-proyecto-c0fa9",
  storageBucket: "gestion-proyecto-c0fa9.appspot.com",
  messagingSenderId: "280835613487",
  appId: "1:280835613487:web:5b77d494cda640431e77da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => 
  addDoc(collection(db, 'tasks'), {title, description});

  export const getTasks = () => getDocs(collection(db, 'tasks'));

  export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

  export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

  export const getTask = (id) => getDoc(doc(db, 'tasks', id));

  export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields)