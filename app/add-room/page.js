"use client";


import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddRoomPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleAddRoom = async (e) => {
    e.preventDefault();

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
      await axios.post("http://localhost:5000/rooms", roomData, {
        withCredentials: true,
      });

      
      toast.success("Room added successfully");
      form.reset();

      setTimeout(() => {
        router.push("/rooms");
      }, 1200);
    } catch (error) {
      setMessage("Failed to add room");
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Study Room</h1>

      <form onSubmit={handleAddRoom} className="space-y-4">

        <input
          name="roomName"
          placeholder="Room Name"
          required
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full border p-3 rounded"
        />

        <input
          name="image"
          placeholder="Image URL"
          required
          className="w-full border p-3 rounded"
        />

        <input
          name="floor"
          placeholder="Floor"
          required
          className="w-full border p-3 rounded"
        />

        <input
          name="capacity"
          type="number"
          placeholder="Capacity"
          required
          className="w-full border p-3 rounded"
        />

        <input
          name="hourlyRate"
          type="number"
          placeholder="Hourly Rate"
          required
          className="w-full border p-3 rounded"
        />

        <div>
          <p className="font-semibold mb-2">Amenities</p>

          <div className="grid grid-cols-2 gap-2">
            {[
              "Whiteboard",
              "Projector",
              "Wi-Fi",
              "Power Outlets",
              "Quiet Zone",
              "Air Conditioning",
            ].map((item) => (
              <label key={item} className="flex gap-2">
                <input type="checkbox" name="amenities" value={item} />
                {item}
              </label>
            ))}
          </div>
        </div>

        <button className="bg-black text-white px-6 py-3 rounded cursor-pointer">
          Add Room
        </button>

        {message && (
          <p className="mt-2 text-blue-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}