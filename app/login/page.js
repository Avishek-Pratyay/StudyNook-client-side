"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import toast from "react-hot-toast";
import API from "@/lib/api";

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(e.target.email.value, e.target.password.value);
      router.push(redirectPath);
    } catch {
      setError("Invalid email or password");
    }
  };

  const handleGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      await axios.post(`${API}/users`, {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      router.push(redirectPath);
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1220] flex items-center justify-center px-4">

      <form onSubmit={handleLogin} className="card w-full max-w-md p-8">

        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400">
          Login
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-white/5 border border-white/10 text-white"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-xl bg-white/5 border border-white/10 text-white"
          required
        />

        {error && (
          <p className="text-red-400 mb-3">{error}</p>
        )}

        <button className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-[1.02] transition cursor-pointer">
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full mt-3 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition cursor-pointer"
        >
          Continue with Google
        </button>

        <p className="text-sm text-slate-400 mt-4 text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-cyan-400">
            Register
          </Link>
        </p>

      </form>
    </main>
  );
}