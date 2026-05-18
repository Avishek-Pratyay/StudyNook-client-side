"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";

export default function RegisterPage() {
  const { registerUser, updateProfile } = useContext(AuthContext);
  const router = useRouter();

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Must contain uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Must contain lowercase letter");
    }

    try {
      // 1. Create user
      const result = await registerUser(email, password);

      // 2. Update profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      // 3. IMPORTANT FIX → force logout (prevents auto login)
      const auth = getAuth();
      await signOut(auth);

      // 4. Redirect to login page
      router.push("/login");

    } catch (err) {
      setError("Registration failed. Try again.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] px-4">

      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-cyan-400">
          Create Account
        </h1>

        <p className="text-center text-slate-400 text-sm mt-2">
          Join StudyNook and book study rooms
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none"
            required
          />

          <input
            name="photo"
            placeholder="Photo URL"
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none"
            required
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-slate-400 text-center mt-5">
          Already have account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}