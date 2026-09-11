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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Case Club Applications</h1>
          <p className="text-slate-500 mt-1">Review member intakes for the monthly live case breakdowns.</p>
        </div>
      </div>

      <div className="space-y-4">
        {cases.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-sm">
            No applications received yet.
          </div>
        ) : (
          cases.map((submission) => (
            <div key={submission.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                    {submission.user?.firstName?.[0] || "U"}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {submission.user?.firstName} {submission.user?.lastName}
                    </h3>
                    <p className="text-sm text-slate-500">IG: <a href={`https://instagram.com/${submission.igHandle}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">@{submission.igHandle}</a></p>
                  </div>
                </div>
                <div>
                  {submission.status === "PENDING" && <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><ShieldCheck size={14}/> Pending Review</span>}
                  {submission.status === "APPROVED" && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle size={14}/> Approved</span>}
                  {submission.status === "REJECTED" && <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><XCircle size={14}/> Rejected</span>}
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Situation</h4>
                <p className="text-sm text-slate-700">{submission.currentSituation}</p>
              </div>

              <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 mb-4">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Specific Inquiry</h4>
                <p className="text-sm text-slate-800">{submission.inquiry}</p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-400">
                  Submitted on {format(submission.createdAt, "MMM d, yyyy h:mm a")}
                </div>
                {submission.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">Decline</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">Select for Live Review</button>
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
