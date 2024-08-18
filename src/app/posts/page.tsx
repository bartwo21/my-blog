import PostList from "@/components/posts-list";
import { Suspense } from "react";
import Loading from "../../components/loadingComponent";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page as string) || 1;

  const postsCount = await prisma.post.count();
  const postsPerPage = 6;
  const totalPages = Math.ceil(postsCount / postsPerPage);

  if (page < 1 || page > totalPages) {
    notFound();
  }

  return (
    <div className="text-center py-16 px-5 flex flex-col flex-grow">
      <h2 className="text-2xl md:text-5xl font-bold mb-5">
        All posts ({postsCount})
      </h2>
      <Suspense fallback={<Loading />}>
        <PostList page={page} />
      </Suspense>

      <div className="flex justify-center gap-2 mt-auto">
        {/* Previous Button */}
        <Link
          href={`/posts?page=${page - 1}`}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-700 text-gray-800 cursor-not-allowed"
              : "bg-zinc-700 text-white"
          } ${page === 1 ? "pointer-events-none" : ""}`}
        >
          Previous
        </Link>

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Link
              key={pageNumber}
              href={`/posts?page=${pageNumber}`}
              className={`px-4 py-2 rounded ${
                pageNumber === page
                  ? "bg-gray-200 text-black"
                  : "bg-zinc-700 text-white"
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}

        {/* Next Button */}
        <Link
          href={`/posts?page=${page + 1}`}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-700 text-gray-800 cursor-not-allowed"
              : "bg-zinc-700 text-white"
          } ${page === totalPages ? "pointer-events-none" : ""}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
