"use client";

import { createPost } from "@/actions/actions";
import React, { useState } from "react";
import LoadingComponent from "./loadingComponent";

const categories = [
  "Tech",
  "Science",
  "Business",
  "Health",
  "Sports",
  "Entertainment",
  "Politics",
];

export default function Form() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    body: "",
    selectedCategories: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDisabled = formData.selectedCategories.length >= 3;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category: string, checked: boolean) => {
    setFormData((prev) => {
      const newCategories = checked
        ? [...prev.selectedCategories, category]
        : prev.selectedCategories.filter((c) => c !== category);

      return { ...prev, selectedCategories: newCategories };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);

    try {
      await createPost(form);
      setFormData({ title: "", author: "", body: "", selectedCategories: [] });
    } catch {
      setError("An error occurred while creating the post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col max-w-[400px] mx-auto mt-10 gap-3"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title for new post"
        required
        className="border rounded px-3 h-10 text-zinc-700"
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        required
        className="border rounded px-3 h-10 text-zinc-700"
      />
      <div className="categories">
        <h3 className="w-full flex mb-2">Categories</h3>
        <div className="flex flex-wrap gap-3 border border-zinc-800 p-4 rounded">
          {categories.map((category) => (
            <label
              key={category}
              className={`flex items-center gap-2 ${
                isDisabled && !formData.selectedCategories.includes(category)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                name="categories"
                value={category}
                checked={formData.selectedCategories.includes(category)}
                onChange={(e) =>
                  handleCheckboxChange(category, e.target.checked)
                }
                disabled={
                  isDisabled && !formData.selectedCategories.includes(category)
                }
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      <textarea
        name="body"
        value={formData.body}
        onChange={handleChange}
        placeholder="Write your post here"
        className="border rounded px-3 text-zinc-700"
        rows={6}
        required
      />
      <button
        type="submit"
        className="h-12 bg-zinc-500 px-5 rounded text-white flex items-center justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoadingComponent /> : "Create Post"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
