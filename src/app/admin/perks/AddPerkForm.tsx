"use client";

import { useRef } from "react";
import { createPartnerPerk } from "./actions";

export function AddPerkForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await createPartnerPerk(formData);
        formRef.current?.reset();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Назва партнера / бренду</label>
        <input 
          type="text" 
          name="title" 
          required 
          className="w-full border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          placeholder="напр. Dyson Pro"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Опис</label>
        <textarea 
          name="description" 
          required
          className="w-full border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 min-h-[80px]"
          placeholder="В чому полягає знижка або пропозиція?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Промокод (необов'язково)</label>
        <input 
          type="text" 
          name="discountCode" 
          className="w-full border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 font-mono"
          placeholder="напр. INSPIRE20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Посилання на сайт (необов'язково)</label>
        <input 
          type="url" 
          name="url" 
          className="w-full border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          placeholder="https://..."
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium p-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
      >
        Додати бонус
      </button>
    </form>
  );
}
