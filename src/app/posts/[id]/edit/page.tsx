import EditPost from "@/components/edit-post";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post) notFound();

  return <EditPost post={post} />;
}
