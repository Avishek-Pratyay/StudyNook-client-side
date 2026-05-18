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
      const result = await registerUser(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      // 🔥 IMPORTANT: force logout so user is NOT auto logged in
      await signOut(getAuth());

      router.push("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] p-6 shadow-lg rounded-lg">

        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <form onSubmit={handleRegister} className="space-y-3">

          <input
            name="name"
            placeholder="Name"
            className="w-full border p-2"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-2"
            required
          />

          <input
            name="photo"
            placeholder="Photo URL"
            className="w-full border p-2"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2"
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <button className="w-full bg-black text-white p-2 cursor-pointer">
            Register
          </button>
        </form>

        <p className="mt-3 text-sm">
          Already have account?{" "}
          <Link href="/login" className="text-blue-500 cursor-pointer">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}