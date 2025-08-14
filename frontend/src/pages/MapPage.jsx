// src/pages/MapPage.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchLocations,
  addLocation,
} from "../features/locations/locationsSlice";
import Sidebar from "../components/Sidebar";
import toast, { Toaster } from "react-hot-toast";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

function FitToMarkers() {
  const map = useMap();
  const items = useSelector((s) => s.locations.items);

  useEffect(() => {
    if (!items.length) return;
    if (items.length === 1) {
      map.setView([items[0].latitude, items[0].longitude], 13);
    } else {
      const bounds = L.latLngBounds(
        items.map((p) => [p.latitude, p.longitude])
      );
      map.fitBounds(bounds.pad(0.2));
    }
  }, [items, map]);

  return null;
}

export default function MapPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.locations);
  const [form, setForm] = useState({ name: "", latitude: "", longitude: "" });

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.latitude || !form.longitude) {
      toast.error("Please fill in all fields");
      return;
    }
    const payload = {
      name: form.name,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };
    const loadingToastId = toast.loading("Adding location...");
    const res = await dispatch(addLocation(payload));
    toast.dismiss(loadingToastId);
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Location added successfully!");
      setForm({ name: "", latitude: "", longitude: "" });
    } else {
      toast.error("Failed to add location");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] text-white">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Sidebar - hidden on small screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 md:ml-60">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Your Map
        </h1>

        {/* Form - full width on mobile */}
        <form
          onSubmit={submit}
          className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-6 bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20"
        >
          <input
            className="flex-1 min-w-0 bg-white/5 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="flex-1 min-w-0 bg-white/5 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Latitude"
            type="number"
            step="any"
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
            required
          />
          <input
            className="flex-1 min-w-0 bg-white/5 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Longitude"
            type="number"
            step="any"
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition cursor-pointer w-full sm:w-auto"
          >
            Add
          </button>
        </form>

        {/* Map - responsive height */}
        <div className="h-[50vh] md:h-[70vh] rounded-xl overflow-hidden border border-white/20 shadow-lg">
          <MapContainer
            center={[3.139, 101.6869]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <FitToMarkers />
            {items.map((p) => (
              <Marker key={p.id} position={[p.latitude, p.longitude]}>
                <Popup>{p.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
