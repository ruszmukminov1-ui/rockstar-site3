import React, { useState } from "react";

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<"login" | "register">("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#111] border border-purple-500/30 text-white rounded-xl sm:rounded-2xl p-4 sm:p-8 w-full max-w-lg mx-auto animate-slide-up z-50 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-400">
            {tab === "login" ? "Вход" : "Регистрация"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("login")}
            className={`w-full py-2 rounded ${
              tab === "login"
                ? "bg-purple-600 text-white"
                : "bg-black border border-purple-600 text-purple-400"
            }`}
          >
            Войти
          </button>
          <button
            onClick={() => setTab("register")}
            className={`w-full py-2 rounded ${
              tab === "register"
                ? "bg-purple-600 text-white"
                : "bg-black border border-purple-600 text-purple-400"
            }`}
          >
            Регистрация
          </button>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Никнейм"
            className="w-full bg-black border border-purple-600 rounded-md p-2 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full bg-black border border-purple-600 rounded-md p-2 focus:outline-none"
          />
          {tab === "register" && (
            <input
              type="password"
              placeholder="Повторите пароль"
              className="w-full bg-black border border-purple-600 rounded-md p-2 focus:outline-none"
            />
          )}
          <button type="submit" className="neon-button w-full">
            {tab === "login" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
