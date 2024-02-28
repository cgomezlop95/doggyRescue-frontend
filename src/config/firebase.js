import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG-YRwsUOqBB8OFhIFHOkbL9qi4XCsyk8",
  authDomain: "doggyrescue-6fa2a.firebaseapp.com",
  projectId: "doggyrescue-6fa2a",
  storageBucket: "doggyrescue-6fa2a.appspot.com",
  messagingSenderId: "473809972187",
  appId: "1:473809972187:web:3225de638ef724472095fe",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Storage
const storage = getStorage(app);

export { storage };
