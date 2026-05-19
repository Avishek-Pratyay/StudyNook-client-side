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
  const { user, loading: authLoading } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  // redirect guest to login, then come back here
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/rooms/${id}/book`);
    }
  }, [user, authLoading, id, router]);

  useEffect(() => {
    const loadRoom = async () => {
      const res = await axios.get(`${API}/rooms/${id}`);
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

      await axios.post(`${API}/bookings`, booking, {
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

  if (!room || authLoading) {
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

        <form onSubmit={handleBook} className="mt-6 space-y-5">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Select booking date
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/10 text-white outline-none focus:border-cyan-400 transition cursor-pointer"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Start time
            </label>
            <input
              type="time"
              name="startTime"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/10 text-white outline-none focus:border-cyan-400 transition cursor-pointer"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              End time
            </label>
            <input
              type="time"
              name="endTime"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/10 text-white outline-none focus:border-cyan-400 transition cursor-pointer"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </form>
      </div>
    </main>
  );
}