import prisma from "@/lib/prisma";
import { Video, FileText, Plus } from "lucide-react";
import { AddContentForm } from "./AddContentForm";

export const dynamic = "force-dynamic";

export default async function ContentLibraryPage() {
  const content = await prisma.content.findMany({
    where: {
      type: {
        in: ["VIDEO_RECORDING", "PDF_MATERIAL"]
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Content Library</h1>
          <p className="text-slate-400 mt-1">Manage past masterclasses, recordings, and PDF materials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white">Library Items</h2>
          {content.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
              No content found. Add your first masterclass or PDF!
            </div>
          ) : (
            content.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                  {item.type === "VIDEO_RECORDING" ? (
                    <Video className="text-pink-600" />
                  ) : (
                    <FileText className="text-rose-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-sm text-pink-600 hover:underline mt-2 inline-block">
                      View Resource &rarr;
                    </a>
                  )}
                </div>
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.isActive ? "bg-yellow-100 text-yellow-700" : "bg-slate-800 text-slate-300"}`}>
                    {item.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-white mb-4">Add New Content</h2>
            <AddContentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
