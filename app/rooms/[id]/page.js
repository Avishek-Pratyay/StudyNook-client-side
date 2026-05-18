"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";
import toast from "react-hot-toast";

export default function RoomDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState(null);

  useEffect(() => {
    const loadRoom = async () => {
      const res = await axios.get(`${API}/rooms/${id}`);
      setRoom(res.data);
    };

    loadRoom();
  }, [id]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1220] text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* IMAGE */}
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <img
            src={room.image}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

          <h1 className="text-3xl font-bold text-cyan-400">
            {room.roomName}
          </h1>

          <p className="text-slate-300 mt-3">
            {room.description}
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm text-slate-300">

            <div className="p-4 rounded-xl bg-black/30 border border-white/10">
              Floor: <span className="text-white">{room.floor}</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10">
              Capacity: <span className="text-white">{room.capacity}</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10">
              Price: <span className="text-cyan-400">${room.hourlyRate}/hr</span>
            </div>

          </div>

          {/* AMENITIES */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2 text-white">
              Amenities
            </h2>

            <div className="flex flex-wrap gap-2">
              {room.amenities?.map((a, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/10"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => router.push(`/rooms/${room._id}/book`)}
            className="mt-8 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition"
          >
            Book Now
          </button>

        </div>
      </div>
    </main>
  );
}