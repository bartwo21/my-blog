import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const postsPerPage = 6;

export default async function PostList({ page }: { page: number }) {
  const posts = await prisma.post.findMany({
    skip: (page - 1) * postsPerPage,
    take: postsPerPage,
  });

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {posts.map((post: any) => {
        const categories = post.categories
          .split(",")
          .map((cat: any) => cat.trim());

        return (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className="flex-none md:w-[31%] sm:w-[48%] w-[100%] h-[200px]"
          >
            <div className="box border border-zinc-700 p-3 rounded flex flex-col h-full gap-3 text-start">
              <p className="text-xs opacity-60 overflow-hidden text-ellipsis whitespace-nowrap">
                {post.author +
                  " · " +
                  new Date(post.createdAt).toLocaleDateString()}
              </p>
              <h2 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {post.title}
              </h2>

              <div className="flex flex-wrap gap-2 mt-auto">
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
          </Link>
        );
      })}
    </div>
  );
}
