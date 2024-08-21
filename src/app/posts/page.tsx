import PostList from "@/components/posts-list";
import { Suspense } from "react";
import Loading from "../../components/loadingComponent";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page as string) || 1;

  const postsCount = await prisma.post.count({
    where: { deletedAt: null },
  });

  const postsPerPage = 6;
  const totalPages = Math.ceil(postsCount / postsPerPage);
  const currentPage = Math.max(page, 1);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const prismaUser = await prisma.user.findFirst({
    where: { email: user?.email || "" },
  });

  const loggedUserPosts = await prisma.post.findMany({
    where: { user: { email: prismaUser?.email || "" } },
  });

  const posts = await prisma.post.findMany({
    where: { deletedAt: null },
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
    orderBy: { createdAt: "desc" },
  });

  if (page < 1 || page > totalPages) {
    notFound();
  }

  return (
    <div className="text-center py-16 px-5 flex flex-col flex-grow">
      <h2 className="text-2xl md:text-3xl tracking-wider mb-5">
        All posts ({postsCount})
      </h2>
      <Suspense fallback={<Loading />}>
        <PostList loggedUserPosts={loggedUserPosts} posts={posts} />
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
