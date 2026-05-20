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
    note: "",
  });

  const hours = [
    "08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00","20:00"
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/rooms/${id}/book`);
    }
  }, [user, authLoading, id, router]);

  useEffect(() => {
    document.title = "StudyNook – Book Rooms";
    axios.get(`${API}/rooms/${id}`).then(res => setRoom(res.data));
  }, [id]);

  const total =
    room && form.startTime && form.endTime
      ? (parseInt(form.endTime) - parseInt(form.startTime)) * room.hourlyRate
      : 0;

  const handleBook = async (e) => {
    e.preventDefault();

    if (new Date(form.date) < new Date().setHours(0,0,0,0)) {
      return toast.error("Select valid date");
    }

    try {
      setLoading(true);

      await axios.post(
        `${API}/bookings`,
        {
          roomId: id,
          roomName: room.roomName,
          image: room.image,
          date: form.date,
          startTime: form.startTime,
          endTime: form.endTime,
          totalCost: total,
          note: form.note,
        },
        { withCredentials: true }
      );

      toast.success("Room booked successfully!");
      router.push("/my-bookings");
    } catch {
      toast.error("Time slot already booked");
    } finally {
      setLoading(false);
    }
  };

  if (!room || authLoading) return null;

  return (
    <main className="min-h-screen bg-[#0b1220] flex justify-center items-center px-4">
      <form
        onSubmit={handleBook}
        className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 text-white"
      >
        <h1 className="text-2xl font-bold text-cyan-400 text-center">
          Book Room
        </h1>

        <div className="space-y-4 mt-6">

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 rounded bg-black/30"
            required
          />

          <select
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            className="w-full p-3 rounded bg-black/30"
            required
          >
            <option value="">Start Time</option>
            {hours.map(h => <option key={h}>{h}</option>)}
          </select>

          <select
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            className="w-full p-3 rounded bg-black/30"
            required
          >
            <option value="">End Time</option>
            {hours
              .filter(h => h > form.startTime)
              .map(h => <option key={h}>{h}</option>)}
          </select>

          <textarea
            placeholder="Special Note (optional)"
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="w-full p-3 rounded bg-black/30"
          />

          <div className="text-cyan-400 font-semibold">
            Total Cost: ${total}
          </div>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-105 transition cursor-pointer">
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </div>
      </form>
    </main>
  );
}