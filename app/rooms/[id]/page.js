"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

export default function RoomDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState(null);

  useEffect(() => {
    const loadRoom = async () => {
      const res = await axios.get(`http://localhost:5000/rooms/${id}`);
      setRoom(res.data);
    };

    if (id) loadRoom();
  }, [id]);

  if (!room) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <img
        src={room.image}
        alt={room.roomName}
        className="w-full h-[400px] object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-6">
        {room.roomName}
      </h1>

      <p className="text-gray-600 mt-4">
        {room.description}
      </p>

      <div className="mt-6 space-y-2">
        <p><strong>Floor:</strong> {room.floor}</p>
        <p><strong>Capacity:</strong> {room.capacity} people</p>
        <p><strong>Hourly Rate:</strong> ${room.hourlyRate}</p>
        <p><strong>Booking Count:</strong> {room.bookingCount || 0}</p>
        <p><strong>Owner:</strong> {room.ownerEmail}</p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">Amenities:</h3>

        <div className="flex flex-wrap gap-2">
          {room.amenities?.map((item, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          if (!user) {
            router.push("/login");
          } else {
            router.push(`/rooms/${id}/book`);
          }
        }}
        className="mt-8 bg-black text-white px-6 py-3 rounded cursor-pointer"
      >
        {user ? "Book Now" : "Login to Book"}
      </button>
    </div>
  );
}