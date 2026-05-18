"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import API from "@/lib/api";

export default function EditRoomPage() {
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedRoom = {
      roomName: form.roomName.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: parseInt(form.capacity.value),
      hourlyRate: parseInt(form.hourlyRate.value),
    };

    try {
      await axios.patch(`${API}/rooms/${id}`, updatedRoom, {
        withCredentials: true,
      });

      toast.success("Room updated successfully");

      setTimeout(() => {
        router.push("/my-listings");
      }, 1000);
    } catch (err) {
      toast.error("Update failed");
      console.log(err);
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

      <div className="w-full max-w-2xl p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

        <h1 className="text-2xl font-bold text-center text-cyan-400">
          Edit Room
        </h1>

        <p className="text-center text-slate-400 text-sm mt-2">
          Update your room details
        </p>

        <form onSubmit={handleUpdate} className="mt-6 space-y-4">

          {/* Room Name */}
          <div>
            <label className="text-sm text-slate-300 block mb-1">
              Room name
            </label>
            <input
              name="roomName"
              defaultValue={room.roomName}
              className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400 cursor-text"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-slate-300 block mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={room.description}
              className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400 cursor-text"
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-slate-300 block mb-1">
              Image URL
            </label>
            <input
              name="image"
              defaultValue={room.image}
              className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400 cursor-text"
            />
          </div>

          {/* Floor + Capacity */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="text-sm text-slate-300 block mb-1">
                Floor
              </label>
              <input
                name="floor"
                defaultValue={room.floor}
                className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400 cursor-text"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300 block mb-1">
                Capacity
              </label>
              <input
                name="capacity"
                defaultValue={room.capacity}
                className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400 cursor-text"
              />
            </div>

          </div>

          {/* Hourly Rate */}
          <div>
            <label className="text-sm text-slate-300 block mb-1">
              Hourly rate
            </label>
            <input
              name="hourlyRate"
              defaultValue={room.hourlyRate}
              className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400 cursor-text"
            />
          </div>

          {/* Button */}
          <button className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition cursor-pointer">
            Update Room
          </button>

        </form>
      </div>
    </main>
  );
}