import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function PostList() {
  const posts = await prisma.post.findMany();
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id} className="mb-3">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
