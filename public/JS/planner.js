import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsSujIYeaqgiu8GjbmktUUelj9hw22P8E",
  authDomain: "gestion-proyecto-c0fa9.firebaseapp.com",
  projectId: "gestion-proyecto-c0fa9",
  storageBucket: "gestion-proyecto-c0fa9.appspot.com",
  messagingSenderId: "280835613487",
  appId: "1:280835613487:web:5b77d494cda640431e77da"
};

firebase.initializeApp(firebaseConfig);
// 2. Crear referencia a la colección de historias del tablero
const db = firebase.firestore();
const storiesCollection = db.collection("stories");

// 3. Función para agregar una historia
function addStory() {
  const storyPoints = document.getElementById("storyPoints").value;
  const storyTitle = document.getElementById("storyTitle").value;
  const storyDescription = document.getElementById("storyDescription").value;

  storiesCollection.add({
    storyPoints: parseInt(storyPoints),
    storyTitle: storyTitle,
    storyDescription: storyDescription
  });
}


// 4. Asignar función addStory al evento de envío del formulario
document.getElementById("todoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addStory();
});
