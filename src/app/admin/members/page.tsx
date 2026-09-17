import prisma from "@/lib/prisma";
import { Users, Mail, ShieldAlert } from "lucide-react";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const users = await prisma.user.findMany({
    include: {
      subscription: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Учасники та підписки</h1>
          <p className="text-slate-400 mt-1">Управління учасниками клубу, їхнім статусом та профілями Telegram.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs text-slate-200 uppercase bg-slate-950 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Користувач</th>
                <th className="px-6 py-4">Telegram ID</th>
                <th className="px-6 py-4">Статус підписки</th>
                <th className="px-6 py-4">Приєднався</th>
                <th className="px-6 py-4 text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    Учасників не знайдено. Користувачі з'являться тут, коли запустять бота.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="bg-slate-900 border-b border-slate-800 hover:bg-slate-950">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold">
                        {user.firstName?.[0] || user.username?.[0] || "U"}
                      </div>
                      <div>
                        {user.firstName} {user.lastName}
                        <div className="text-xs text-slate-400 font-normal">
                          {user.username ? `@${user.username}` : "Немає юзернейму"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{user.telegramId.toString()}</td>
                    <td className="px-6 py-4">
                      {user.subscription?.status === "ACTIVE" ? (
                        <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">Активна</span>
                      ) : (
                        <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-xs font-semibold">Неактивна</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{format(user.createdAt, "MMM d, yyyy")}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-pink-600 hover:text-pink-900 font-medium">Керувати</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
