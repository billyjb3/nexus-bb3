import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
const useDatabaseEmulator = import.meta.env.VITE_USE_DATABASE_EMULATOR === 'true';
const useAuthEmulator = import.meta.env.VITE_USE_AUTH_EMULATOR === 'true';
const isDev = import.meta.env.DEV;

const firebaseConfig = {
  apiKey: "AIzaSyCfRZXE9DVuDGUFCEa9B1nu66SA4nRyF0A",
  authDomain: "nexusbb3-d9637.firebaseapp.com",
  projectId: "nexusbb3-d9637",
  storageBucket: "nexusbb3-d9637.firebasestorage.app",
  messagingSenderId: "812803697745",
  appId: "1:812803697745:web:fed54a9e99eb22e5ccdc70",
  databaseURL: "https://nexusbb3-d9637-default-rtdb.firebaseio.com/"
};
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const database = getDatabase(firebase);

if (isDev) {
  if (useDatabaseEmulator) {
    console.log('connecting to database emulator');
    connectDatabaseEmulator(database, "127.0.0.1", 9000);
  }
  if (useAuthEmulator) {
    console.log('connecting to auth emulator');
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  }
}
