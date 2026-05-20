"use client";

import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import API from "@/lib/api";

export default function AddRoomPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;

    const roomData = {
      roomName: form.roomName.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: parseInt(form.capacity.value),
      hourlyRate: parseInt(form.hourlyRate.value),
      amenities: Array.from(
        form.querySelectorAll('input[name="amenities"]:checked')
      ).map((item) => item.value),
      ownerName: user?.displayName || "",
      ownerEmail: user?.email || "",
    };

    try {
      await axios.post(`${API}/rooms`, roomData, {
        withCredentials: true,
      });

      toast.success("Room added successfully");
      form.reset();

      setTimeout(() => {
        router.push("/rooms");
      }, 1000);

    } catch (err) {
      console.log(err);
      setError("Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  document.title = "StudyNook – Add Room";
}, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b1220] px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[450px] h-[450px] bg-indigo-500/20 blur-3xl rounded-full top-20 left-10"></div>
      <div className="absolute w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative w-full max-w-2xl p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-cyan-400">
          Add Study Room
        </h1>

        <p className="text-center text-slate-400 text-sm mt-2">
          Create a new study space for students
        </p>

        <form onSubmit={handleAddRoom} className="mt-6 grid md:grid-cols-2 gap-4">

          <input
            name="roomName"
            placeholder="Room Name"
            className="p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none md:col-span-2"
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            className="p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none md:col-span-2"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none md:col-span-2"
            required
          />

          <input
            name="floor"
            placeholder="Floor"
            className="p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none"
            required
          />

          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            className="p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none"
            required
          />

          <input
            name="hourlyRate"
            type="number"
            placeholder="Hourly Rate"
            className="p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-cyan-400 outline-none md:col-span-2"
            required
          />

          {/* Amenities */}
          <div className="md:col-span-2">
            <p className="text-slate-300 mb-2 font-medium">
              Amenities
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
              {[
                "Wi-Fi",
                "Whiteboard",
                "Projector",
                "AC",
                "Quiet Zone",
                "Power Outlets",
              ].map((item) => (
                <label key={item} className="flex gap-2 items-center">
                  <input type="checkbox" name="amenities" value={item} />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center md:col-span-2">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="md:col-span-2 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Adding Room..." : "Add Room"}
          </button>

        </form>
      </div>
    </main>
  );
}