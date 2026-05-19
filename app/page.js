"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import API from "@/lib/api";

export default function HomePage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
  document.title = "StudyNook – Smart Study Rooms";

  const loadRooms = async () => {
    try {
      const res = await axios.get(`${API}/rooms/latest`);
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  loadRooms();
}, []);

  return (
    <main className="min-h-screen bg-[#0b1220] text-white">

      {/* HERO */}
      <section className="relative text-center py-28 px-6 overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#6366f1_0%,transparent_55%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#06b6d4_0%,transparent_55%)] opacity-20"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Find Your Perfect{" "}
          <span className="text-cyan-400">Study Room</span>
        </h1>

        <p className="mt-6 text-slate-300 max-w-2xl mx-auto">
          Browse and book quiet,private study rooms in your library.List your own room and earn.
        </p>

        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

  <Link
    href="/rooms"
    className="relative z-20 inline-block px-7 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
  >
    Explore Rooms
  </Link>

  <Link
    href="/add-room"
    className="relative z-20 inline-block px-7 py-3 rounded-xl font-semibold border border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 hover:scale-105 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
  >
    Host a Room
  </Link>

</div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">

        <div className="card p-6 text-center">
          <h3 className="font-bold text-lg">Instant Booking</h3>
          <p className="text-slate-400 text-sm mt-2">
            Reserve rooms in seconds with real-time availability
          </p>
        </div>

        <div className="card p-6 text-center">
          <h3 className="font-bold text-lg">Quiet Environment</h3>
          <p className="text-slate-400 text-sm mt-2">
            Focus-friendly spaces designed for productivity
          </p>
        </div>

        <div className="card p-6 text-center">
          <h3 className="font-bold text-lg">Affordable Pricing</h3>
          <p className="text-slate-400 text-sm mt-2">
            Pay only for what you use, no hidden cost
          </p>
        </div>

      </section>

      {/* ROOMS SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold mb-8">
          Featured Study Rooms
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {rooms.map((room) => (
            <div
              key={room._id}
              className="card overflow-hidden hover:scale-[1.02] transition duration-300"
            >

              {/* image */}
              <img
                src={room.image || "/default.png"}
                className="h-48 w-full object-cover"
              />

              {/* content */}
              <div className="p-5">

                <h3 className="text-lg font-bold">
                  {room.roomName}
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  {room.description?.slice(0, 90)}...
                </p>

                {/* info */}
                <div className="mt-3 text-sm text-slate-300 space-y-1">
                  <p>Floor: {room.floor}</p>
                  <p>Capacity: {room.capacity} people</p>
                  <p className="text-cyan-400 font-semibold">
                    ${room.hourlyRate}/hr
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
  {room.amenities?.slice(0, 3).map((item, index) => (
    <span
      key={index}
      className="px-2 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400"
    >
      {item}
    </span>
  ))}

  {room.amenities?.length > 3 && (
    <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-slate-300">
      +{room.amenities.length - 3} more
    </span>
  )}
</div>

                {/* button */}
                <Link
                  href={`/rooms/${room._id}`}
                  className="mt-4 block text-center bg-gradient-to-r from-indigo-500 to-cyan-500 py-2 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  View Details
                </Link>

              </div>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}