"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";
import toast from "react-hot-toast";
import { AuthContext } from "@/providers/AuthProvider";

export default function BookRoomPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const loadRoom = async () => {
      const res = await axios.get(`http://localhost:5000/rooms/${id}`);
      setRoom(res.data);
    };

    loadRoom();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const booking = {
        roomId: id,
        roomName: room.roomName,
        image: room.image,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        userEmail: user.email,
        status: "pending",
      };

      await axios.post("http://localhost:5000/bookings", booking, {
        withCredentials: true,
      });

      toast.success("Booking successful");
      router.push("/my-bookings");
    } catch (err) {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b1220] px-4">

      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

        <h1 className="text-2xl font-bold text-center text-cyan-400">
          Book Room
        </h1>

        <p className="text-center text-slate-400 text-sm mt-2">
          {room.roomName}
        </p>

        <form onSubmit={handleBook} className="mt-6 space-y-4">

          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white cursor-pointer"
            required
          />

          <input
            type="number"
            name="startTime"
            placeholder="Start Time"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white cursor-pointer"
            required
          />

          <input
            type="number"
            name="endTime"
            placeholder="End Time"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white cursor-pointer"
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </form>
      </div>
    </main>
  );
}