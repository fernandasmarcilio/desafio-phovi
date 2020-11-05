import firebaseApp from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATHClbP6vGOJ8SI5jblde07GXnJG_ahFQ",
  authDomain: "desafio-trivia.firebaseapp.com",
  databaseURL: "https://desafio-trivia.firebaseio.com",
  projectId: "desafio-trivia",
  storageBucket: "desafio-trivia.appspot.com",
  messagingSenderId: "454824541320",
  appId: "1:454824541320:web:2b422b369f0a3602b0f33d"
};


firebaseApp.initializeApp(firebaseConfig);
const firebase = firebaseApp.firestore()

export default firebase;
