"use client";

import React, { useState } from "react";
import Link from "next/link";
import { deletePost } from "@/actions/actions";
import LoadingComponent from "./loadingComponent";

export default function PostActions({ postId }: { postId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost(postId);
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {isDeleting ? (
        <LoadingComponent />
      ) : (
        <>
          <button
            onClick={handleDelete}
            className="text-red-900 hover:text-red-500 transition-colors"
          >
            Delete
          </button>
          <Link
            href={`/posts/${postId}/edit`}
            className="text-blue-900 hover:text-blue-500 transition-colors"
          >
            Edit
          </Link>
        </>
      )}
    </div>
  );
}
