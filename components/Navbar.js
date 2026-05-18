"use client";

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";

export default function Navbar() {
  const { user, logoutUser, loading } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutUser();
  };

  if (loading) {
    return <nav className="px-6 py-3 shadow-md">Loading...</nav>;
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-md bg-white">

      <Link href="/" className="text-xl font-bold cursor-pointer">
        StudyNook
      </Link>

      <div className="flex gap-5 items-center">
        <Link href="/" className="hover:text-blue-500 cursor-pointer">
          Home
        </Link>

        <Link href="/rooms" className="hover:text-blue-500 cursor-pointer">
          Rooms
        </Link>

        {user && (
  <>
    <Link href="/add-room" className="hover:text-blue-500 cursor-pointer">
      Add Room
    </Link>

    <Link href="/my-bookings" className="hover:text-blue-500 cursor-pointer">
      My Bookings
    </Link>
    <Link href="/my-listings" className="hover:text-blue-500 cursor-pointer">
  My Listings
</Link>
  </>
)}
        {!user && (
          <>
            <Link href="/login" className="hover:text-blue-500 cursor-pointer">
              Login
            </Link>

            <Link href="/register" className="hover:text-blue-500 cursor-pointer">
              Register
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <img
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://i.ibb.co/2n0T2kR/default-user.png"
              }
              alt="user"
              className="w-[35px] h-[35px] rounded-full"
            />

            <span>{user.displayName || "User"}</span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-gray-500">Guest</span>
        )}
      </div>
    </nav>
  );
}