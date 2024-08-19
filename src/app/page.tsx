import PostList from "@/components/posts-list";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  try {
    const posts = await prisma.post.findMany({
      where: { deletedAt: null },
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    return (
      <main className="text-center pt-24 px-5">
        <h2 className="text-3xl md:text-5xl font-bold mb-5">
          Welcome to my blog!
        </h2>
        <p className="max-w-[740px] mx-auto leading-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo,
          adipisci! Omnis quasi fuga earum inventore reprehenderit voluptas
          culpa, illum iste veritatis quidem, tempore hic ipsam temporibus, sed
          provident repellat recusandae?
        </p>
        <h2 className="font-bold text-3xl text-start mt-12 mb-6 ml-8">
          Latest Posts
        </h2>
        <PostList posts={posts} />
        <Link
          href="/posts"
          className="block mt-8 border w-[150px] p-3 rounded-xl ml-auto mr-8 hover:bg-gray-300 transition-colors hover:text-zinc-900"
        >
          View all posts
        </Link>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return <div>Error loading posts</div>;
  }
}
