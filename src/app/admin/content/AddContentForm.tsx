"use client";

import { useRef } from "react";
import { createContent } from "./actions";

export function AddContentForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await createContent(formData);
        formRef.current?.reset();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Назва</label>
        <input 
          type="text" 
          name="title" 
          required 
          className="w-full border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          placeholder="напр. Майстер-клас: Теорія кольору"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Тип</label>
        <select 
          name="type" 
          required
          className="w-full border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          <option value="VIDEO_RECORDING">Відеозапис</option>
          <option value="PDF_MATERIAL">PDF Матеріал</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Опис</label>
        <textarea 
          name="description" 
          className="w-full border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 min-h-[80px]"
          placeholder="Короткий опис контенту..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Посилання (URL на Відео/PDF)</label>
        <input 
          type="url" 
          name="url" 
          className="w-full border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          placeholder="https://..."
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium p-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
      >
        Зберегти контент
      </button>
    </form>
  );
}
