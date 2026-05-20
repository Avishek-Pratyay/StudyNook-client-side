"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import API from "@/lib/api";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API}/bookings`, {
        withCredentials: true,
      });

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!confirm("Cancel booking?")) return;

    await axios.patch(
      `${API}/bookings/${id}/cancel`,
      {},
      { withCredentials: true }
    );

    toast.success("Booking cancelled");
    loadBookings();
  };

  return (
    <main className="min-h-screen bg-[#0b1220] text-white px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">

          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-5 rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={b.image}
                className="w-full max-w-sm h-48 object-cover rounded-xl"
              />

              <h2 className="text-xl font-bold mt-4">
                {b.roomName}
              </h2>

              <p>{b.date}</p>
              <p>{b.startTime} - {b.endTime}</p>
              <p>${b.totalCost}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                  b.status === "confirmed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {b.status}
              </span>

              {b.status === "confirmed" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="block mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Cancel
                </button>
              )}

            </div>
          ))}

        </div>
      )}
    </main>
  );
}