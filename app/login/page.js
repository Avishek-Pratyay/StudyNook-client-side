"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(e.target.email.value, e.target.password.value);
      router.push("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1220] flex items-center justify-center px-4">

      <form
        onSubmit={handleLogin}
        className="card w-full max-w-md p-8"
      >

        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400">
          Login
        </h1>

        <input
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-white/5 border border-white/10 text-white"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-xl bg-white/5 border border-white/10 text-white"
        />

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <button className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition">
          Login
        </button>

        <p className="text-sm text-slate-400 mt-4 text-center">
          No account?{" "}
          <Link href="/register" className="text-cyan-400">
            Register
          </Link>
        </p>

      </form>
    </main>
  );
}