"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function BookRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState(null);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`http://localhost:5000/rooms/${id}`);
      setRoom(res.data);
    };

    load();
  }, [id]);

  const calculate = (start, end) => {
    if (!room) return;
    const totalCost = (parseInt(end) - parseInt(start)) * room.hourlyRate;
    setTotal(totalCost);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const form = e.target;

    const bookingData = {
      roomId: id,
      roomName: room.roomName,
      image: room.image,
      date: form.date.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
      totalCost: total,
      note: form.note.value,
    };

    try {
      await axios.post(
        "http://localhost:5000/bookings",
        bookingData,
        { withCredentials: true }
      );

      setMessage("Room booked successfully");

      setTimeout(() => {
        router.push("/my-bookings");
      }, 1000);
    } catch {
      setMessage("Selected slot already booked");
    }
  };

  if (!room) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Book {room.roomName}
      </h1>

      <form onSubmit={handleBooking} className="space-y-4">

        <input
          type="date"
          name="date"
          required
          className="w-full border p-3 rounded"
        />

        <select
          name="startTime"
          required
          onChange={(e) =>
            calculate(e.target.value, document.getElementsByName("endTime")[0].value)
          }
          className="w-full border p-3 rounded"
        >
          <option value="">Start Time</option>
          {Array.from({ length: 13 }, (_, i) => i + 8).map((t) => (
            <option key={t} value={t}>
              {t}:00
            </option>
          ))}
        </select>

        <select
          name="endTime"
          required
          onChange={(e) =>
            calculate(document.getElementsByName("startTime")[0].value, e.target.value)
          }
          className="w-full border p-3 rounded"
        >
          <option value="">End Time</option>
          {Array.from({ length: 13 }, (_, i) => i + 8).map((t) => (
            <option key={t} value={t}>
              {t}:00
            </option>
          ))}
        </select>

        <textarea
          name="note"
          placeholder="Special note"
          className="w-full border p-3 rounded"
        />

        <p className="font-bold">
          Total Cost: ${total}
        </p>

        <button className="bg-black text-white px-6 py-3 rounded cursor-pointer">
          Confirm Booking
        </button>

        {message && (
          <p className="text-blue-600">{message}</p>
        )}
      </form>
    </div>
  );
}