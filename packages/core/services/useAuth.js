import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { auth } from './firebaseConfig.js';

export const AuthContext = createContext({
  isAuthLoading: true,
  createAccount: () => {},
  login: () => {},
  logout: () => {},
  userData: {},
});
export const useAuthContext = () => useContext(AuthContext);

// TODO: export error code(s) for account creation with email already in use?
export function useAuth (config = {}) {
  const {
    persistence = browserSessionPersistence,
  } = config;
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      // TODO: pull any user data you need from here and save in context state, but not the whole user object
      if (response) {
        console.log('auth state changed, is auth: true');
        console.log('authStateChanged value:');
        console.log(response);
        const { uid, email } = response;
        setUserData({ userId: uid, email });
        setIsAuthenticated(true);
      } else {
        console.log('auth state changed, is auth: false');
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    });

    setPersistence(auth, persistence);
  }, []);

  const createAccount = useCallback((email, password) => {
    setIsAuthLoading(true);
    return new Promise((res, rej) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          const { user } = response;
          res({ user });
        })
        .catch((err) => {
          rej({ errorCode: err.code, errorMessage: err.message });
          setIsAuthLoading(false);
        });
    });
  }, [auth]);

  const login = useCallback((email, password) => {
    setIsAuthLoading(true);
    return new Promise((res, rej) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          res({ user });
        })
        .catch((err) => {
          rej({ errorCode: err.code, errorMessage: err.message });
          setIsAuthLoading(false);
        });
    });
  }, [auth]);

  const logout = useCallback(() => {
    setIsAuthLoading(true);
    return new Promise((res, rej) => {
      signOut(auth)
        .then(() => {
          res({});
        })
        .catch((err) => {
          rej({ errorCode: err.code, errorMessage: err.message });
          setIsAuthLoading(false);
        });
    });
  }, [auth]);

  return {
    isAuthLoading,
    isAuthenticated,
    userData,
    createAccount,
    login,
    logout,
  };
}
