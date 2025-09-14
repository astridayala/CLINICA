import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CustomToolbar({ label, onNavigate, onView }) {
  return (
    <div className="flex justify-between items-center mb-4">
      {/* Navegación */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate("TODAY")}
          className="px-3 py-1 hover:bg-[#c3ddf4] font-medium rounded-3xl border-2 w-20 h-10 mr-8"
        >
          Hoy
        </button>
        <button
          onClick={() => onNavigate("PREV")}
          className="p-2 rounded-full hover:bg-[#c3ddf4] flex justify-center"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="p-2 rounded-full hover:bg-[#c3ddf4] flex justify-center"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Label (ejemplo: "September 2025") */}
      <span className="text-2xl font-semibold">{label}</span>

      {/* Botones de vista */}
      <div className="flex border-2 h-10 rounded-3xl">
        <button
          onClick={() => onView("month")}
          className="px-3 py-1 rounded-s-3xl hover:bg-[#c3ddf4] pl-5 pr-5"
        >
          Mes
        </button>
        <button
          onClick={() => onView("week")}
          className="px-3 py-1 hover:bg-[#c3ddf4] pl-5 pr-5 border-l-2 border-r-2"
        >
          Semana
        </button>
        <button
          onClick={() => onView("day")}
          className="px-3 py-1 rounded-e-3xl hover:bg-[#c3ddf4] pl-5 pr-5"
        >
          Día
        </button>
      </div>
    </div>
  );
}
