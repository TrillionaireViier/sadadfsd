import prisma from "@/lib/prisma";
import { CreditCard, Tag } from "lucide-react";
import { AddPerkForm } from "./AddPerkForm";

export const dynamic = "force-dynamic";

export default async function PerksPage() {
  const perks = await prisma.partnerPerk.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Бонуси від партнерів</h1>
          <p className="text-slate-400 mt-1">Управління промокодами та спеціальними пропозиціями для учасників клубу.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white">Актуальні бонуси</h2>
          {perks.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
              Ще не додано жодного бонусу.
            </div>
          ) : (
            perks.map((perk) => (
              <div key={perk.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{perk.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{perk.description}</p>
                  
                  {perk.discountCode && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg text-sm font-mono font-bold text-slate-200 select-all">
                      <Tag size={14} className="text-slate-400" />
                      {perk.discountCode}
                    </div>
                  )}
                  
                  {perk.url && (
                    <div className="mt-3">
                      <a href={perk.url} target="_blank" rel="noreferrer" className="text-sm text-yellow-600 hover:underline">
                        Перейти на сайт партнера &rarr;
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-white mb-4">Додати новий бонус</h2>
            <AddPerkForm />
          </div>
        </div>
      </div>
    </div>
  );
}
