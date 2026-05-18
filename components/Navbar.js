"use client";

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `hover:text-indigo-600 transition ${
      isActive(path)
        ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
        : ""
    }`;

  if (loading) {
    return (
      <nav className="px-6 py-4 bg-white shadow">
        Loading...
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1220]/70 border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-cyan-400">
          StudyNook
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link className={linkClass("/")} href="/">
            Home
          </Link>

          <Link className={linkClass("/rooms")} href="/rooms">
            Rooms
          </Link>

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

        {/* Right side */}
        <div className="flex items-center gap-3">

          {user ? (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/2n0T2kR/default-user.png"}
                className="w-9 h-9 rounded-full border hover:scale-105 transition"
              />

              <span className="text-sm font-semibold hidden sm:block">
                {user.displayName}
              </span>

              <button
                onClick={logoutUser}
                className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3 text-sm">

              <Link
                href="/login"
                className="px-3 py-1 rounded hover:bg-gray-100 hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Register
              </Link>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}