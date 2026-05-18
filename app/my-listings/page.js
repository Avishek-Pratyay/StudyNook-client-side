"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import API from "@/lib/api";

export default function MyListingsPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    document.title = "StudyNook – My Listings";
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await axios.get(
        `${API}/my-listings`,
        { withCredentials: true }
      );

      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete room?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/rooms/${id}`,
        { withCredentials: true }
      );

      loadRooms();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Listings
      </h1>

      {rooms.length === 0 ? (
        <p>No rooms added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="border p-4 rounded">
              <img
                src={room.image || "/default.png"}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-3">
                {room.roomName}
              </h2>

              <p>{room.floor}</p>
              <p>${room.hourlyRate}/hr</p>

              <div className="flex gap-2 mt-4">
                <Link
                  href={`/edit-room/${room._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}