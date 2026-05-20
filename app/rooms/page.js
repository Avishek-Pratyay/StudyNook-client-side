"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import API from "@/lib/api";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // filters
  const [amenities, setAmenities] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [floor, setFloor] = useState("");

  useEffect(() => {
    document.title = "StudyNook – Available Rooms";
    fetchRooms();
  }, []);

  // ✅ fetch function (backend compatible)
  const fetchRooms = async (value = "", filters = {}) => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (value) params.append("search", value);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.floor) params.append("floor", filters.floor);

      if (filters.amenities?.length > 0) {
        params.append("amenities", filters.amenities.join(","));
      }

      const res = await axios.get(`${API}/rooms?${params.toString()}`);
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // ✅ unified filter handler (FIXED)
  const applyFilters = (value = search, override = {}) => {
    fetchRooms(value, {
      amenities,
      minPrice,
      maxPrice,
      floor,
      ...override,
    });
  };

  return (
    <main className="min-h-screen bg-[#0b1220] text-white px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">Explore Rooms</h1>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          applyFilters(e.target.value);
        }}
        placeholder="Search rooms..."
        className="w-full md:w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 text-white"
      />

      {/* AMENITIES */}
      <div className="flex gap-4 flex-wrap mt-4 text-sm">
        {["WiFi", "AC", "Projector", "Whiteboard", "Power Outlets", "Quiet Zone"].map((item) => (
          <label key={item} className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => {
                let updated = [...amenities];

                if (e.target.checked) {
                  updated.push(item);
                } else {
                  updated = updated.filter((a) => a !== item);
                }

                setAmenities(updated);
                applyFilters(search, { amenities: updated });
              }}
            />
            {item}
          </label>
        ))}
      </div>

      {/* PRICE + FLOOR FILTERS */}
      <div className="flex gap-3 mt-4">

        <input
          type="number"
          placeholder="Min Price"
          className="p-2 bg-white/5 border rounded"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            applyFilters(search, { minPrice: e.target.value });
          }}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="p-2 bg-white/5 border rounded"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            applyFilters(search, { maxPrice: e.target.value });
          }}
        />

        <input
          type="number"
          placeholder="Floor"
          className="p-2 bg-white/5 border rounded"
          value={floor}
          onChange={(e) => {
            setFloor(e.target.value);
            applyFilters(search, { floor: e.target.value });
          }}
        />

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-cyan-400">
            No rooms found
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {rooms.map((room) => (
            <div key={room._id} className="card overflow-hidden">

              <img
                src={room.image}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <h2 className="font-bold text-lg">
                  {room.roomName}
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  {room.description?.slice(0, 80)}...
                </p>

                <div className="mt-3 text-sm text-slate-300">
                  <p>Floor: {room.floor}</p>
                  <p>Capacity: {room.capacity}</p>
                  <p className="text-cyan-400 font-semibold">
                    ${room.hourlyRate}/hr
                  </p>
                </div>

                <Link
                  href={`/rooms/${room._id}`}
                  className="mt-4 block text-center bg-gradient-to-r from-indigo-500 to-cyan-500 py-2 rounded-xl"
                >
                  View Details
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}
    </main>
  );
}