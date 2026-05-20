"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import API from "@/lib/api";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "StudyNook – Available Rooms";
    fetchRooms();
  }, []);

  const fetchRooms = async (value = "") => {
    setLoading(true);

    try {
      const res = await axios.get(`${API}/rooms?search=${value}`);
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0b1220] text-white px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">Explore Rooms</h1>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchRooms(e.target.value);
        }}
        placeholder="Search rooms..."
        className="w-full md:w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 text-white"
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-cyan-400">
            No rooms found
          </h2>
          <p className="text-slate-400 mt-2">
            Try another search keyword
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {rooms.map((room) => (
            <div key={room._id} className="card overflow-hidden">

              <img
                src={room.image}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <h2 className="font-bold text-lg">
                  {room.roomName}
                </h2>

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
                  className="mt-4 block text-center bg-gradient-to-r from-indigo-500 to-cyan-500 py-2 rounded-xl hover:scale-[1.02] transition cursor-pointer"
                >
                  View Details
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}
    </main>
  );
}