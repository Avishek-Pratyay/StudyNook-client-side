"use client";


import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const router = useRouter();

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      router.push("/");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
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
            Login
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="w-full mt-3 border p-2 cursor-pointer"
        >
          Continue with Google
        </button>

        <p className="mt-3 text-sm">
          No account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}