"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData, imageUrl: string) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!isAuthenticated) {
    redirect("/login");
  }
  const user = await getUser();
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const author = formData.get("author") as string;
  const categories = formData.getAll("categories") as string[];

  const prismaUser = await prisma.user.findFirst({
    where: { email: user?.email ?? "" },
  });

  await prisma.post.create({
    data: {
      title,
      body,
      author,
      categories: categories.join(", "),
      image: imageUrl,
      userId: prismaUser!.id,
    },
  });

  revalidatePath("/posts");
}

export async function deletePost(id: number) {
  await prisma.post.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/posts");
}

export async function restorePost(id: number) {
  await prisma.post.update({
    where: { id },
    data: { deletedAt: null },
  });

  revalidatePath("/posts");
}

export async function updatePost(
  id: number,
  formData: FormData,
  imageUrl: string
) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const categories = formData.get("categories") as string;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      body,
      categories,
      image: imageUrl,
    },
  });

  redirect(`/posts/${id}`);
}
