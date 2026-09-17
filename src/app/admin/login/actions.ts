"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get("password")?.toString().trim().toUpperCase();
  
  if (password === "INSPIRE2026" || password === "12345") {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    
    return { success: true };
  }
  
  return { error: "Неправильний пароль. Спробуйте ще раз." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_role");
  redirect("/admin/login");
}
