import PostList from "@/components/posts-list";
import prisma from "@/lib/db";
import Link from "next/link";

// npx prisma studio
// npx prisma db push

export default async function Home() {
  try {
    const posts = await prisma.post.findMany({
      where: { deletedAt: null },
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    return (
      <main className="text-center md:pt-24 pt-12 px-5">
        <h1 className="text-3xl font-bold text-gray-400 font-sans">
          Welcome to My Blog
        </h1>
        <p className="text-md text-gray-500 leading-relaxed text-left p-8 font-sans font-normal">
          Are you ready to discover what you've been curious about? Here, you'll
          find inspiring articles on technology, art, lifestyle, and much more.
          This page is filled with content tailored to your interests, aiming to
          offer you new perspectives. Start exploring our blog, packed with the
          latest trends, practical tips, and in-depth analyses, and add value to
          your life with the knowledge you'll gain.
        </p>
        <h2 className="font-bold text-3xl text-start mt-6 mb-6 ml-8">
          Latest Posts
        </h2>
        <PostList posts={posts} />
        <Link
          href="/posts"
          className="block my-8 border w-[150px] p-3 rounded-xl ml-auto mr-8 hover:bg-gray-300 transition-colors hover:text-zinc-900"
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
