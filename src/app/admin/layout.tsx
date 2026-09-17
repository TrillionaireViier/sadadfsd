import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Video, ShieldCheck, CreditCard, Menu, Coins } from "lucide-react";
import { cookies } from "next/headers";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value;
  const nickname = cookieStore.get("auth_nickname")?.value;
  const isAdmin = role === "admin";
  
  const displayName = nickname ? decodeURIComponent(nickname) : (isAdmin ? "Адміністратор" : "Учасник клубу");

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
            I
          </div>
          <span className="font-bold text-white tracking-tight">INSPIRE Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Дашборд" />
          {isAdmin && (
            <>
              <NavItem href="/admin/members" icon={<Users size={20} />} label="Учасники та підписки" />
              <NavItem href="/admin/deposits" icon={<Coins size={20} />} label="Поповнення" />
            </>
          )}
          <NavItem href="/admin/schedule" icon={<Calendar size={20} />} label="Розклад трансляцій" />
          <NavItem href="/admin/content" icon={<Video size={20} />} label="Бібліотека контенту" />
          {isAdmin && (
            <NavItem href="/admin/cases" icon={<ShieldCheck size={20} />} label="Заявки на розбір" />
          )}
          <NavItem href="/admin/perks" icon={<CreditCard size={20} />} label="Бонуси від партнерів" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 md:px-8 justify-between md:justify-end">
          <button className="md:hidden text-slate-400">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-300">
              {displayName}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-700"></div>
            <form action={async () => {
              "use server";
              const { logoutAction } = await import("./login/actions");
              await logoutAction();
            }}>
              <button type="submit" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded border border-slate-700 transition-colors ml-2">
                Вийти
              </button>
            </form>
          </div>
        </header>
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-pink-600 hover:bg-pink-50 font-medium transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
