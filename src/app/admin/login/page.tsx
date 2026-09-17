"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldAlert } from "lucide-react";

const ADMIN_PASSWORD = "admin";
const USER_PASSWORD = "123"; // Changed from 12345 to 123 to match standard test pwd

export default function AdminLogin() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const USERS = [
      { nickname: "Данило", password: "111", role: "admin" },
      { nickname: "Саша", password: "222", role: "admin" },
      { nickname: "Юзер", password: "333", role: "user" },
    ];

    const user = USERS.find(
      (u) =>
        u.nickname.toLowerCase() === nickname.trim().toLowerCase() &&
        u.password === password.trim()
    );

    if (user) {
      document.cookie = `auth_role=${user.role}; path=/; max-age=2592000`;
      document.cookie = `auth_nickname=${encodeURIComponent(user.nickname)}; path=/; max-age=2592000`;
      router.push("/admin");
    } else {
      setError("Невірний нікнейм або пароль.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-6 relative">
          <div className="w-16 h-16 bg-pink-600/10 border border-pink-500/20 rounded-2xl flex items-center justify-center text-pink-500">
            <Lock size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2 tracking-tight">
          Вхід в кабінет клубу
        </h1>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Будь ласка, введіть ваш нікнейм та пароль для доступу.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              placeholder="Ваш нікнейм (Telegram або ім'я)..."
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-slate-600 mb-4"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Введіть пароль..."
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-slate-600"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
              <ShieldAlert size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
          >
            {loading ? "Перевірка..." : "Увійти"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
          <p className="text-xs text-slate-500">
            Введіть пароль для доступу до панелі.
          </p>
        </div>
      </div>
    </div>
  );
}
