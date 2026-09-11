"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveDeposit(depositId: string, userId: string) {
  // Update deposit
  await prisma.deposit.update({
    where: { id: depositId },
    data: { status: "APPROVED" }
  });

  // Activate user subscription for 30 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  
  await prisma.subscription.upsert({
    where: { userId },
    update: { 
      status: "ACTIVE",
      expiresAt 
    },
    create: {
      userId,
      status: "ACTIVE",
      expiresAt
    }
  });

  revalidatePath("/admin/deposits");
}

export async function rejectDeposit(depositId: string) {
  await prisma.deposit.update({
    where: { id: depositId },
    data: { status: "REJECTED" }
  });

  revalidatePath("/admin/deposits");
}
