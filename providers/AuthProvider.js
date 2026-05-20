"use client";

import { createContext, useEffect, useState } from "react";
import app from "@/firebase/firebase.config";
import API from "@/lib/api";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);

      await axios.post(
        `${API}/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser?.email) {
        setUser(currentUser);

        try {
          // clear previous token
          await axios.post(
            `${API}/logout`,
            {},
            { withCredentials: true }
          );

          // create fresh token for current user
          await axios.post(
            `${API}/jwt`,
            {
              email: currentUser.email,
            },
            { withCredentials: true }
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await axios.post(
            `${API}/logout`,
            {},
            { withCredentials: true }
          );
        } catch (err) {
          console.log(err);
        }

        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}