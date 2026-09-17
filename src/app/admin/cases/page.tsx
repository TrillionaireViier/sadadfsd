import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { ShieldCheck, XCircle, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CaseClubPage() {
  const cases = await prisma.caseSubmission.findMany({
    include: {
      user: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Заявки на розбір</h1>
          <p className="text-slate-400 mt-1">Перегляд заявок учасників на щомісячний розбір у прямому ефірі.</p>
        </div>
      </div>

      <div className="space-y-4">
        {cases.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 shadow-sm">
            Заявок поки немає.
          </div>
        ) : (
          cases.map((submission) => (
            <div key={submission.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-200">
                    {submission.user?.firstName?.[0] || "U"}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">
                      {submission.user?.firstName} {submission.user?.lastName}
                    </h3>
                    <p className="text-sm text-slate-400">IG: <a href={`https://instagram.com/${submission.igHandle}`} target="_blank" rel="noreferrer" className="text-pink-600 hover:underline">@{submission.igHandle}</a></p>
                  </div>
                </div>
                <div>
                  {submission.status === "PENDING" && <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><ShieldCheck size={14}/> На розгляді</span>}
                  {submission.status === "APPROVED" && <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle size={14}/> Схвалено</span>}
                  {submission.status === "REJECTED" && <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><XCircle size={14}/> Відхилено</span>}
                </div>
              </div>
              
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Поточна ситуація</h4>
                <p className="text-sm text-slate-200">{submission.currentSituation}</p>
              </div>

              <div className="bg-pink-50/50 p-4 rounded-lg border border-pink-100 mb-4">
                <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">Конкретний запит</h4>
                <p className="text-sm text-slate-800">{submission.inquiry}</p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  Надіслано {format(submission.createdAt, "MMM d, yyyy h:mm a")}
                </div>
                {submission.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">Відхилити</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors">Обрати для розбору</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
