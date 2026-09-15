import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { DepositActionButtons } from "./DepositActionButtons";

export const dynamic = "force-dynamic";

export default async function DepositsPage() {
  const deposits = await prisma.deposit.findMany({
    include: {
      user: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Crypto Deposits</h1>
          <p className="text-slate-400 mt-1">Review TRC20 transactions manually to activate subscriptions.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs text-slate-200 uppercase bg-slate-950 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">TxID / Hash</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    No deposits found.
                  </td>
                </tr>
              ) : (
                deposits.map((deposit) => (
                  <tr key={deposit.id} className="bg-slate-900 border-b border-slate-800 hover:bg-slate-950">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold">
                        {deposit.user?.firstName?.[0] || deposit.user?.username?.[0] || "U"}
                      </div>
                      <div>
                        {deposit.user?.firstName} {deposit.user?.lastName}
                        <div className="text-xs text-slate-400 font-normal">
                          {deposit.user?.username ? `@${deposit.user.username}` : "No username"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs max-w-[200px] truncate">{deposit.txId}</td>
                    <td className="px-6 py-4">
                      {deposit.status === "PENDING" && <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"><Clock size={12}/> Pending</span>}
                      {deposit.status === "APPROVED" && <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"><CheckCircle size={12}/> Approved</span>}
                      {deposit.status === "REJECTED" && <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"><XCircle size={12}/> Rejected</span>}
                    </td>
                    <td className="px-6 py-4">{format(deposit.createdAt, "MMM d, yyyy h:mm a")}</td>
                    <td className="px-6 py-4 text-right">
                      {deposit.status === "PENDING" && (
                        <DepositActionButtons depositId={deposit.id} userId={deposit.user.id} />
                      )}
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
