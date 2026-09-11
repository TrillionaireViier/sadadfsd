"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPartnerPerk(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const discountCode = formData.get("discountCode") as string;
  const url = formData.get("url") as string;

  if (!title || !description) {
    throw new Error("Missing required fields");
  }

  await prisma.partnerPerk.create({
    data: {
      title,
      description,
      discountCode: discountCode || null,
      url: url || null,
      isActive: true,
    }
  });

  revalidatePath("/admin/perks");
}
