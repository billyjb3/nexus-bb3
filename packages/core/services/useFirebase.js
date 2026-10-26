import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  connectAuthEmulator,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfRZXE9DVuDGUFCEa9B1nu66SA4nRyF0A",
  authDomain: "nexusbb3-d9637.firebaseapp.com",
  projectId: "nexusbb3-d9637",
  storageBucket: "nexusbb3-d9637.firebasestorage.app",
  messagingSenderId: "812803697745",
  appId: "1:812803697745:web:fed54a9e99eb22e5ccdc70"
};

export const FirebaseContext = createContext({
  firebaseApp: null,
  authApp: null,
});
export const useFirebaseContext = () => useContext(FirebaseContext);

export function useFirebase(app) {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const firebase = initializeApp(firebaseConfig);
    const auth = getAuth(firebase);

    connectAuthEmulator(auth, 'http://127.0.0.1:9099'); // TODO: use env variable to switch between local and prod

    onAuthStateChanged(auth, (user) => {
      // TODO: pull any user data you need from here and save in context state, but not the whole user object
      if (user) {
        console.log('auth state changed, is auth: true');
        setIsAuthenticated(true);
      } else {
        console.log('auth state changed, is auth: false');
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    setPersistence(auth, app === 'electron' ? browserLocalPersistence : browserSessionPersistence);

    setFirebaseApp(firebase); // TODO: make sure its ok to store these values in state
    setAuth(auth);
  }, []);

  const createAccount = useCallback((email, password) => {
    setIsLoading(true);
    return new Promise((res, rej) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => { // need user object here?
          res({ user });
        })
        .catch((err) => {
          rej({ errorCode: err.code, errorMessage: err.message });
          setIsLoading(false);
        });
    });
  }, [auth]);

  const login = useCallback((email, password) => {
    setIsLoading(true);
    return new Promise((res, rej) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          res({ user });
        })
        .catch((err) => {
          rej({ errorCode: err.code, errorMessage: err.message });
          setIsLoading(false);
        });
    });
  }, [auth]);

  const logout = useCallback(() => {
    setIsLoading(true);
    return new Promise((res, rej) => {
      signOut(auth)
        .then(() => {
          res({});
        })
        .catch((err) => {
          rej({ errorCode: err.code, errorMessage: err.message });
          setIsLoading(false);
        });
    });
  }, [auth]);

  return {
    firebaseApp,
    auth,
    isAuthenticated,
    isLoading,
    createAccount,
    login,
    logout,
  };
}
