"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData, imageUrl: string) {
  const { isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const author = formData.get("author") as string;
  const categories = formData.getAll("categories") as string[];

  await prisma.post.create({
    data: {
      title,
      body,
      author,
      categories: categories.join(", "),
      image: imageUrl,
    },
  });

  revalidatePath("/posts");
}
