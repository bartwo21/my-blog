"use client";

import { useState } from "react";
import Image from "next/image";
import { createComment } from "@/actions/actions";

interface CommentFormProps {
  postId: number;
  user: any;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, user }) => {
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (commentBody.trim() === "") return;

    const formData = new FormData();
    formData.append("body", commentBody);

    setLoading(true);

    try {
      await createComment(postId, formData);
      setCommentBody("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCommentSubmit}
      className="mt-3 w-1/3 flex gap-3 relative"
    >
      {user?.picture ? (
        user.picture.startsWith("https://gravatar.com/avatar/") ? (
          <p className="text-lg font-semibold text-white bg-gray-500 rounded-full h-10 w-12 flex items-center justify-center">
            {user?.given_name
              ?.split(" ")
              .map((name: string) => name[0])
              .join("")}
          </p>
        ) : (
          <Image
            src={user.picture}
            width={32}
            height={32}
            alt="userPic"
            className="rounded-full h-10 w-10"
          />
        )
      ) : (
        <p className="text-xs font-semibold text-white bg-gray-500 rounded-full h-10 w-12 flex items-center justify-center"></p>
      )}

      <input
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        name="body"
        type="text"
        placeholder="Add a comment"
        disabled={user === null || user === undefined || user === "" || loading}
        className="
          w-full
          h-10
          px-4
          text-sm
          text-gray-300
          placeholder-gray-400
          bg-zinc-700
          border
          border-none
          rounded-md
          outline-none
          focus:outline-none
          focus:ring-2
          focus:ring-zinc-500
          focus:border-transparent
          transition
          hover:border-gray-400
          focus:border-gray-500
        "
      />
      <button
        type="submit"
        className="bg-zinc-300 p-[6px] text-white rounded-full absolute right-2 top-[6px] hover:bg-white transition-colors"
        disabled={user === null || user === undefined || user === "" || loading}
      >
        {loading ? (
          <div className="w-4 h-4 border-4 border-t-4 border-gray-200 border-opacity-50 rounded-full border-t-zinc-500 animate-spin"></div>
        ) : (
          <Image src="/send.png" alt="send" width={16} height={16} />
        )}
      </button>
    </form>
  );
};

export default CommentForm;
