import React, { useState } from "react";

const UserMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const userEmail = localStorage.getItem("currentUser");

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2 cursor-pointer group"
        onClick={() => setOpen(!open)}
      >
        <img
          src="/avatar.png"
          alt="User"
          className="w-10 h-10 rounded-full transition-transform duration-300 group-hover:scale-110"
        />
        <span className="text-white font-semibold text-lg transition-transform duration-300 group-hover:scale-110">
          Rockstar
        </span>
      </div>

      {/* Выпадающее меню */}
      {open && (
        <div className="absolute mt-2 left-0 bg-neutral-900 border border-purple-500 rounded-xl shadow-lg w-48 animate-fade-down">
          <div className="p-3 text-white border-b border-purple-500">
            {userEmail}
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-purple-800 transition"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

