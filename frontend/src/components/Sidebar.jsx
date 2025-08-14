// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // nice icons

export default function Sidebar() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-200 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-black/40 backdrop-blur-md px-4 py-3 border-b border-white/10">
        <h2 className="text-lg font-bold text-white">Locations</h2>
        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-black/50 backdrop-blur-xl border-r border-white/10 p-4 transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 text-white">Locations</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/map" className={linkClasses}>
            Map
          </NavLink>
          <NavLink to="/upload" className={linkClasses}>
            Upload
          </NavLink>
        </nav>
        <button
          onClick={() => {
            dispatch(logout());
            nav("/login");
          }}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Logout
        </button>
      </aside>

      {/* Overlay for mobile when menu open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}
    </>
  );
}
