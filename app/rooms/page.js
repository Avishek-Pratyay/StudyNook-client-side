"use client";


import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRooms();
      document.title = "StudyNook – Available Rooms";

  }, []);

  const fetchRooms = async (value = "") => {
    const res = await axios.get(
      `http://localhost:5000/rooms?search=${value}`
    );

    setRooms(res.data);
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Available Rooms
      </h1>

      <input
        type="text"
        placeholder="Search room..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchRooms(e.target.value);
        }}
        className="border p-3 rounded w-full max-w-md mb-8"
      />

      {rooms.length === 0 ? (
        <p>No rooms found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="border rounded p-4 flex flex-col"
            >
              <img
                src={room.image}
                alt={room.roomName}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-3">
                {room.roomName}
              </h2>

              <p className="text-sm text-gray-600 mt-2 flex-grow">
                {room.description.slice(0, 100)}...
              </p>

              <p className="mt-2">Floor: {room.floor}</p>
              <p>Capacity: {room.capacity}</p>
              <p>${room.hourlyRate}/hr</p>

              <Link
                href={`/rooms/${room._id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}