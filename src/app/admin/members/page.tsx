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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Members & Subscriptions</h1>
          <p className="text-slate-500 mt-1">Manage club members, their status, and Telegram profiles.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Telegram ID</th>
                <th className="px-6 py-4">Subscription Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    No members found. Users will appear here when they start the bot.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {user.firstName?.[0] || user.username?.[0] || "U"}
                      </div>
                      <div>
                        {user.firstName} {user.lastName}
                        <div className="text-xs text-slate-400 font-normal">
                          {user.username ? `@${user.username}` : "No username"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{user.telegramId.toString()}</td>
                    <td className="px-6 py-4">
                      {user.subscription?.status === "ACTIVE" ? (
                        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">Active</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-semibold">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{format(user.createdAt, "MMM d, yyyy")}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 font-medium">Manage</button>
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
