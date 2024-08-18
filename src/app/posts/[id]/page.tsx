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

  const categories = post?.categories
    ? post.categories.split(",").map((cat: any) => cat.trim())
    : [];

  if (!post) notFound();
  return (
    <main className="px-7 pt-24 text-center h-full flex justify-center items-center m-auto">
      <div key={post.id} className="h-full">
        <div className="box border border-zinc-700 p-6 rounded flex flex-col justify-between gap-3 text-start">
          <p className="text-xs opacity-60 overflow-hidden text-ellipsis whitespace-nowrap">
            {post.author +
              " · " +
              new Date(post.createdAt).toLocaleDateString()}
          </p>
          <h2 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            {post.title}
          </h2>
          <p className="text-sm">{post.body}</p>
          <div className="flex flex-wrap gap-2 mt-auto h-full">
            {categories.map((category: string, index: number) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 text-xs font-medium py-1 px-2 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
