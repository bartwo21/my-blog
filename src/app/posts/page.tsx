import PostList from "@/components/posts-list";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import LoadingComponent from "../../components/loadingComponent";
import { getPosts } from "../../actions/actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page as string) || 1;

  const { totalPages, posts } = await getPosts(page);

  if (page < 1 || page > totalPages) {
    notFound();
  }

  return (
    <div className="text-center py-16 px-5 flex flex-col flex-grow">
      <h2 className="text-2xl md:text-3xl tracking-wider mb-5">All posts</h2>
      <Suspense key={page} fallback={<LoadingComponent />}>
        <PostList posts={posts} />
      </Suspense>

      <div className="flex justify-center gap-2 md:mt-auto mt-5">
        <Link
          href={`/posts?page=${page - 1}`}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-700 text-gray-800 cursor-not-allowed"
              : "bg-zinc-700 text-white hover:bg-gray-700 transition-colors"
          } ${page === 1 ? "pointer-events-none" : ""}`}
        >
          Previous
        </Link>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Link
              key={pageNumber}
              href={`/posts?page=${pageNumber}`}
              className={`px-4 py-2 rounded ${
                pageNumber === page
                  ? "bg-gray-200 text-black"
                  : "bg-zinc-700 text-white hover:bg-gray-700 transition-colors"
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}

        <Link
          href={`/posts?page=${page + 1}`}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-700 text-gray-800 cursor-not-allowed"
              : "bg-zinc-700 text-white hover:bg-gray-700 transition-colors"
          } ${page === totalPages ? "pointer-events-none" : ""}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
