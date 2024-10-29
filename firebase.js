// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Importando o módulo de autenticação
import { getFirestore } from "firebase/firestore"; // Importando Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1m9614KWHEAufmo2k1N4c0dk0GpsPVGg",
  authDomain: "apprefeicaokaic.firebaseapp.com",
  projectId: "apprefeicaokaic",
  storageBucket: "apprefeicaokaic.appspot.com",
  messagingSenderId: "252218391607",
  appId: "1:252218391607:web:d23f47815231eb5e2693b2",
  measurementId: "G-CB35B04FVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicialize a autenticação
const auth = getAuth(app); // Criando a instância de autenticação

// Inicializando o Firestore
const firestore = getFirestore(app); // Criando a instância do Firestore

export { auth, firestore }; // Exporte as instâncias para que possam ser usadas em outros arquivos
