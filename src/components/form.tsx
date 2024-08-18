import { createPost } from "@/actions/actions";
import React from "react";

export default function Form() {
  return (
    <form
      className="flex flex-col max-w-[400px] mx-auto mt-10 gap-3"
      action={createPost}
    >
      <input
        type="name"
        name="title"
        placeholder="Title for new post"
        required
        className="border rounded px-3 h-10 text-zinc-700"
      />
      <textarea
        name="body"
        placeholder="
    Write your post here"
        className="border rounded px-3 text-zinc-700"
        rows={6}
        required
      />
      <button
        type="submit"
        className="h-10 bg-zinc-500 px-5 rounded text-white"
      >
        Create Post
      </button>
    </form>
  );
}
