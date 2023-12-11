// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsSujIYeaqgiu8GjbmktUUelj9hw22P8E",
    authDomain: "gestion-proyecto-c0fa9.firebaseapp.com",
    databaseURL: "https://gestion-proyecto-c0fa9-default-rtdb.firebaseio.com",
    projectId: "gestion-proyecto-c0fa9",
    storageBucket: "gestion-proyecto-c0fa9.appspot.com",
    messagingSenderId: "280835613487",
    appId: "1:280835613487:web:5b77d494cda640431e77da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


signUp.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid),{
                username: username,
                email: email
            })
            alert('user created!');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert('errorMessage');
            // ..
        });
})

