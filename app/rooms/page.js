"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import API from "@/lib/api";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "StudyNook – Rooms";
    fetchRooms();
  }, []);

  const fetchRooms = async (value = "") => {
    const res = await axios.get(`${API}/rooms?search=${value}`);
    setRooms(res.data);
  };

  return (
    <main className="min-h-screen bg-[#0b1220] text-white px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">Explore Rooms</h1>

      {/* search */}
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchRooms(e.target.value);
        }}
        placeholder="Search rooms..."
        className="w-full md:w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 text-white"
      />

      {/* grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {rooms.map((room) => (
          <div key={room._id} className="card overflow-hidden">

            <img
              src={room.image}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">

              <h2 className="font-bold text-lg">{room.roomName}</h2>

              <p className="text-slate-400 text-sm mt-1">
                {room.description?.slice(0, 80)}...
              </p>

              <div className="mt-3 text-sm text-slate-300">
                <p>Floor: {room.floor}</p>
                <p>Capacity: {room.capacity}</p>
                <p className="text-cyan-400 font-semibold">
                  ${room.hourlyRate}/hr
                </p>
              </div>

              <Link
                href={`/rooms/${room._id}`}
                className="mt-4 block text-center bg-gradient-to-r from-indigo-500 to-cyan-500 py-2 rounded-xl"
              >
                View Details
              </Link>

            </div>
          </div>
        ))}

      </div>
    </main>
  );
}