"use client";

import { useTransition } from "react";
import { approveDeposit, rejectDeposit } from "./actions";

export function DepositActionButtons({ depositId, userId }: { depositId: string, userId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-end gap-2">
      <button 
        disabled={isPending}
        onClick={() => startTransition(() => rejectDeposit(depositId))}
        className="px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors disabled:opacity-50"
      >
        Reject
      </button>
      <button 
        disabled={isPending}
        onClick={() => startTransition(() => approveDeposit(depositId, userId))}
        className="px-3 py-1.5 text-xs font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors disabled:opacity-50"
      >
        Approve
      </button>
    </div>
  );
}
