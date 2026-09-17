"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMember(userId: string) {
  await prisma.user.delete({
    where: { id: userId }
  });
  
  revalidatePath("/admin/members");
}
