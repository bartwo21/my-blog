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

  const newPost = await prisma.post.create({
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
  redirect(`/posts/${newPost.id}`);
}

export async function deletePost(id: number) {
  await prisma.post.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  // await prisma.comment.deleteMany({
  //   where: { postId: id },
  // });

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

export async function createComment(postId: number, formData: FormData) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!isAuthenticated) {
    redirect("/login");
  }

  const user = await getUser();
  const body = formData.get("body") as string;

  if (!user?.email) {
    throw new Error("User email is not available");
  }

  const prismaUser = await prisma.user.findFirst({
    where: { email: user.email },
  });

  if (!prismaUser) {
    throw new Error("User not found");
  }

  await prisma.comment.create({
    data: {
      body,
      postId,
      userId: prismaUser.id,
    },
  });

  revalidatePath(`/posts/${postId}`);
}
