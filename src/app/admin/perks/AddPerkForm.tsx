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
        <label className="block text-sm font-medium text-slate-700 mb-1">Partner/Brand Name</label>
        <input 
          type="text" 
          name="title" 
          required 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g. Dyson Pro"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea 
          name="description" 
          required
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
          placeholder="What is the discount or offer?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Promo Code (Optional)</label>
        <input 
          type="text" 
          name="discountCode" 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
          placeholder="e.g. INSPIRE20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Brand URL (Optional)</label>
        <input 
          type="url" 
          name="url" 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="https://..."
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium p-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
      >
        Add Partner Perk
      </button>
    </form>
  );
}
