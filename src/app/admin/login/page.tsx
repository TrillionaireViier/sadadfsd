"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldAlert } from "lucide-react";

const ADMIN_PASSWORD = "12345";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.trim() === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      document.cookie = "admin_token=authenticated; path=/; max-age=2592000";
      router.push("/admin");
    } else {
      setError("Невірний пароль. Спробуйте ще раз.");
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
          Вхід в адмін-панель
        </h1>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Будь ласка, введіть пароль адміністратора для продовження.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
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
            Підказка: пароль <span className="font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">12345</span>
          </p>
        </div>
      </div>
    </div>
  );
}
