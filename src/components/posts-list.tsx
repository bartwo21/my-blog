"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostActions from "./postAction";

export default function PostList({
  loggedUserPosts,
  posts,
}: {
  loggedUserPosts?: any;
  posts?: any;
}) {
  const filteredPosts = posts?.filter((post: any) => !post.deletedAt);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {filteredPosts?.map((post: any) => {
        const categories = post.categories
          .split(",")
          .map((cat: any) => cat.trim());
        const isUserPost = loggedUserPosts?.some(
          (userPost: any) => userPost.id === post.id
        );

        return (
          <div
            key={post.id}
            className="flex-none md:w-[31%] sm:w-[48%] w-[100%] h-[250px] border border-zinc-700 hover:border-zinc-500 transition-colors rounded relative"
          >
            <Link
              href={`/posts/${post.id}`}
              className="flex flex-col h-full p-3 rounded text-start"
            >
              <div className="flex flex-col h-full gap-3">
                <p className="text-xs opacity-60 overflow-hidden text-ellipsis whitespace-nowrap flex gap-1">
                  {post.author +
                    " · " +
                    new Date(post.createdAt).toLocaleDateString()}{" "}
                  {isUserPost && <span className="font-bold"> · You</span>}
                </p>
                {post.image && (
                  <div className="relative w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      height="50"
                      width="50"
                      className="rounded h-28 w-full object-cover"
                      unoptimized
                      priority
                    />
                  </div>
                )}
                <h2 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  {post.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {categories[0] &&
                    categories.map((category: string, index: number) => (
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
            {isUserPost && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-end items-center gap-3 p-2 rounded-b">
                <PostActions postId={post.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
