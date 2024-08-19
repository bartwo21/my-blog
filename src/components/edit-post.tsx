"use client";

import Image from "next/image";
import React, { useState } from "react";
import { updatePost } from "@/actions/actions";
import LoadingComponent from "./loadingComponent";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";

const availableCategories = [
  "Tech",
  "Science",
  "Business",
  "Health",
  "Sports",
  "Entertainment",
  "Politics",
];

export default function EditPost({ post }: { post: any }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [selectedCategories, setSelectedCategories] = useState(
    post.categories
      ? post.categories.split(",").map((cat: any) => cat.trim())
      : []
  );
  const [image, setImage] = useState(post.image);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setSelectedCategories((prevCategories: any) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat: any) => cat !== category);
      } else if (prevCategories.length < 3) {
        return [...prevCategories, category];
      }
      return prevCategories;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("author", post.author);
      formData.append("categories", selectedCategories.join(", "));

      if (image) {
        formData.append("image", image);
      }

      await updatePost(post.id, formData, image);
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsLoading(false);
      toast.success("Post updated successfully!");
    }
  };

  return (
    <div className="border border-zinc-700 p-6 rounded flex flex-col justify-between gap-3 text-start mx-7 my-16 flex-grow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-xs opacity-60 overflow-hidden text-ellipsis whitespace-normal">
          {post.author + " · " + new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="p-2 border border-zinc-600 rounded bg-zinc-800 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="body" className="text-sm font-bold">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            className="p-2 border border-zinc-600 rounded bg-zinc-800 text-white h-40 resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold">Categories</label>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 text-blue-500 border border-zinc-600 rounded focus:ring-blue-500"
                />
                {category}
              </label>
            ))}
          </div>
          {selectedCategories.length === 3 && (
            <p className="text-sm text-zinc-500">
              You can select up to 3 categories.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-sm font-bold">
            Image
          </label>
          {image && (
            <div className="mt-2">
              <Image
                src={image}
                alt="Selected Image"
                height="100"
                width="100"
                className="rounded object-contain"
                unoptimized
              />
            </div>
          )}
          <UploadButton
            className="mr-auto mt-2"
            appearance={{
              allowedContent: "hidden",
              button: "bg-zinc-800 hover:bg-zinc-600 transition-colors mr-auto",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0) {
                const imageUrl = res[0].url;
                setImage(imageUrl);
              }
            }}
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-zinc-500 text-white rounded hover:bg-zinc-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <div>
              <LoadingComponent />
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}
