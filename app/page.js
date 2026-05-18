"use client";


import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function HomePage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      const res = await axios.get("http://localhost:5000/rooms");
      setRooms(res.data.slice(0, 6));
    };
    useEffect(() => {
  document.title = "StudyNook – Home";
}, []);

    loadRooms();
  }, []);

  return (
    <main className="px-6 py-10">

      {/* hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Perfect Study Room
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Browse and book quiet, private study rooms in your library.
          List your own room and earn.
        </p>

        <Link
          href="/rooms"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Explore Rooms
        </Link>
      </section>

      {/* latest rooms */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Available Study Rooms
        </h2>

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

              <h3 className="text-xl font-semibold mt-3">
                {room.roomName}
              </h3>

              <p className="text-sm text-gray-600 mt-2 flex-grow">
                {room.description.slice(0, 100)}...
              </p>

              <p className="mt-2">Floor: {room.floor}</p>
              <p>Capacity: {room.capacity} people</p>
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
      </section>

      {/* static extra 1 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Why StudyNook?
        </h2>

        <p className="text-gray-600">
          Discover peaceful spaces designed for focused learning.
          Book by hour, choose amenities, and reserve instantly.
        </p>
      </section>

      {/* static extra 2 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Trusted by Students
        </h2>

        <p className="text-gray-600">
          Students use StudyNook to find private rooms for exam prep,
          group sessions, and research.
        </p>
      </section>
    </main>
  );
}