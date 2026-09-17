import { Users, Video, ShieldCheck, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Огляд дашборду</h1>
        <p className="text-slate-400 mt-1">Ласкаво просимо до адмін-панелі INSPIRE CLUB.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Активні учасники" value="128" icon={<Users className="text-pink-600" />} />
        <StatCard title="Весь контент" value="45" icon={<Video className="text-yellow-600" />} />
        <StatCard title="Заявок на розбір" value="12" icon={<ShieldCheck className="text-amber-600" />} />
        <StatCard title="Місячний MRR" value="$12,800" icon={<Activity className="text-rose-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-4">Нові підписки</h2>
          <div className="text-sm text-slate-400">База підключена. Дані з'являться тут, коли користувачі підпишуться через Telegram.</div>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-4">Швидка розсилка</h2>
          <textarea 
            className="w-full border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all min-h-[120px] bg-slate-950 text-white"
            placeholder="Введіть повідомлення для розсилки всім активним учасникам у Telegram..."
          />
          <button className="mt-3 bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
            Надіслати розсилку
          </button>
        </div>
      </div>
    </div>

  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex items-center shadow-sm">
      <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
