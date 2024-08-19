import prisma from "@/lib/db";
import Image from "next/image";
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
    <div className="border border-zinc-700 p-6 rounded flex flex-col justify-between gap-3 text-start mx-7 my-16 flex-grow">
      <p className="text-xs opacity-60 overflow-hidden text-ellipsis whitespace-normal">
        {post.author + " · " + new Date(post.createdAt).toLocaleDateString()}
      </p>
      <h2 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-normal">
        {post.title}
      </h2>
      <p className="text-sm whitespace-normal break-words">{post.body}</p>
      {post.image && (
        <div className="h-full w-full max-w-fit">
          <Image
            src={post.image}
            alt={post.title}
            height="100"
            width="100"
            className="rounded h-full max-h-[500px] w-full object-contain"
            unoptimized
          />
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-auto h-full">
        {categories.map((category: string, index: number) => (
          <span
            key={index}
            className="bg-blue-200 text-blue-800 text-xs font-medium py-1 px-2 rounded whitespace-normal"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
