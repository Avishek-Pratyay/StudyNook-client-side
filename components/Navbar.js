"use client";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";

    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `hover:text-indigo-400 transition-all duration-300 cursor-pointer ${
      isActive(path)
        ? "text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1"
        : "text-white"
    }`;

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <nav className="px-6 py-5 bg-[#0b1220] text-white shadow">
        Loading...
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1220]/80 border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400 tracking-wide hover:scale-105 transition"
        >
          StudyNook
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium">

          <Link className={linkClass("/")} href="/">Home</Link>
          <Link className={linkClass("/rooms")} href="/rooms">Rooms</Link>

          {user && (
            <>
              <Link className={linkClass("/add-room")} href="/add-room">
                Add Room
              </Link>

              <Link className={linkClass("/my-bookings")} href="/my-bookings">
                Bookings
              </Link>

              <Link className={linkClass("/my-listings")} href="/my-listings">
                Listings
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">

          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {user ? (
            <>
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/2n0T2kR/default-user.png"
                }
                alt="user"
                className="w-10 h-10 rounded-full border border-cyan-400 object-cover hover:scale-110 transition cursor-pointer"
              />

              <span className="text-sm font-semibold text-white hidden lg:block">
                {user.displayName}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3 text-sm">

              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-white hover:bg-white/10 hover:text-cyan-400 transition cursor-pointer"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition cursor-pointer"
              >
                Register
              </Link>

            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl cursor-pointer"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-5 bg-[#0b1220]/95 backdrop-blur-xl border-t border-white/10 space-y-4">

          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg bg-white/10 text-white"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          <br />

          <Link href="/" className={linkClass("/")}>Home</Link>
          <br />
          <Link href="/rooms" className={linkClass("/rooms")}>Rooms</Link>

          {user && (
            <>
              <br />
              <Link href="/add-room" className={linkClass("/add-room")}>
                Add Room
              </Link>

              <br />
              <Link href="/my-bookings" className={linkClass("/my-bookings")}>
                Bookings
              </Link>

              <br />
              <Link href="/my-listings" className={linkClass("/my-listings")}>
                Listings
              </Link>
            </>
          )}

          <div className="pt-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3">

                <Link
                  href="/login"
                  className="px-4 py-2 border rounded text-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 bg-indigo-600 rounded text-white"
                >
                  Register
                </Link>

              </div>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}