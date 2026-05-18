"use client";

import { createContext, useEffect, useState } from "react";
import app from "@/firebase/firebase.config";
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

  // REGISTER
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LOGIN
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // GOOGLE LOGIN
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // LOGOUT (STABLE FIX)
  const logoutUser = async () => {
    try {
      // 1. Firebase logout FIRST
      await signOut(auth);

      // 2. Clear backend cookie
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );

      // 3. Force UI update
      setUser(null);
      setLoading(false);
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  // AUTH LISTENER (FINAL FIX)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("AUTH STATE:", currentUser);

      if (currentUser) {
        setUser(currentUser);

        try {
          await axios.post(
            "http://localhost:5000/jwt",
            { email: currentUser.email },
            { withCredentials: true }
          );
        } catch (err) {
          console.log(err);
        }
      } else {
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