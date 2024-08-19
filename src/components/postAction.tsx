"use client";

import React, { useState } from "react";
import Link from "next/link";
import { deletePost, restorePost } from "@/actions/actions";
import LoadingComponent from "./loadingComponent";
import toast from "react-hot-toast";

export default function PostActions({ postId }: { postId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const revertDelete = async () => {
    setIsDeleting(true);
    try {
      await restorePost(postId);
      toast.success("Post restored successfully!");
    } catch (error) {
      console.error("Failed to restore post:", error);
      toast.error("Failed to restore post.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost(postId);
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleting(false);
      toast.success((t) => {
        t.duration = 5000;
        return (
          <div>
            Post deleted successfully!{" "}
            <button
              onClick={revertDelete}
              className="text-blue-900 bg-blue-200 p-1 px-2 rounded hover:text-blue-800 hover:bg-blue-300 transition-all"
            >
              Undo
            </button>
          </div>
        );
      });
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
