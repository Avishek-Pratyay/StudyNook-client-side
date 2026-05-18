"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const res = await axios.get(
      "http://localhost:5000/my-bookings",
      { withCredentials: true }
    );

    setBookings(res.data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    await axios.patch(
      `http://localhost:5000/bookings/${id}/cancel`,
      {},
      { withCredentials: true }
    );

    loadBookings();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="border p-4 rounded">
              <img
                src={b.image}
                className="w-full max-w-sm h-48 object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-2">
                {b.roomName}
              </h2>

              <p>Date: {b.date}</p>
              <p>
                {b.startTime}:00 - {b.endTime}:00
              </p>
              <p>Total: ${b.totalCost}</p>
              <p>Status: {b.status}</p>

              {b.status === "confirmed" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}