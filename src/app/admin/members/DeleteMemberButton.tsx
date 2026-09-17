"use client";

import { useTransition } from "react";
import { deleteMember } from "./actions";
import { Trash2 } from "lucide-react";

export function DeleteMemberButton({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      disabled={isPending}
      onClick={() => {
        if (window.confirm("Ви впевнені, що хочете видалити цього користувача? Це дія незворотна.")) {
          startTransition(() => deleteMember(userId));
        }
      }}
      className="text-rose-600 hover:text-rose-900 font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
      title="Видалити користувача"
    >
      <Trash2 size={16} />
      <span>{isPending ? "Видалення..." : "Видалити"}</span>
    </button>
  );
}
