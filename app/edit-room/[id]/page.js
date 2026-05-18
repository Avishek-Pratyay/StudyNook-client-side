"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadRoom = async () => {
      const res = await axios.get(`http://localhost:5000/rooms/${id}`);
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

    await axios.patch(
      `http://localhost:5000/rooms/${id}`,
      updatedRoom,
      { withCredentials: true }
    );

    
    toast.success("Room details updated successfully");

    setTimeout(() => {
      router.push("/my-listings");
    }, 1000);
  };

  if (!room) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Room
      </h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          name="roomName"
          defaultValue={room.roomName}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          defaultValue={room.description}
          className="w-full border p-3 rounded"
        />

        <input
          name="image"
          defaultValue={room.image}
          className="w-full border p-3 rounded"
        />

        <input
          name="floor"
          defaultValue={room.floor}
          className="w-full border p-3 rounded"
        />

        <input
          name="capacity"
          defaultValue={room.capacity}
          className="w-full border p-3 rounded"
        />

        <input
          name="hourlyRate"
          defaultValue={room.hourlyRate}
          className="w-full border p-3 rounded"
        />

        <button className="bg-black text-white px-6 py-3 rounded cursor-pointer">
          Update Room
        </button>

        {message && (
          <p className="text-blue-600">{message}</p>
        )}
      </form>
    </div>
  );
}