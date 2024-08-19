import PostActions from "@/components/postAction";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
  });

  const prismaUser = await prisma.user.findFirst({
    where: { email: user?.email || "" },
  });

  const loggedUserPosts = await prisma.post.findMany({
    where: { user: { email: prismaUser?.email || "" } },
  });

  const isUserPost = loggedUserPosts?.some(
    (userPost: any) => userPost.id === post?.id
  );

  const categories = post?.categories
    ? post.categories.split(",").map((cat: any) => cat.trim())
    : [];

  if (!post) notFound();
  return (
    <div className="relative border border-zinc-700 p-6 rounded flex flex-col justify-between gap-3 text-start mx-7 my-16 flex-grow">
      <p className="text-xs opacity-60 overflow-hidden text-ellipsis whitespace-normal">
        {post.author + " · " + new Date(post.createdAt).toLocaleDateString()}
      </p>
      <h2 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-normal">
        {post.title}
      </h2>
      <p className="text-sm whitespace-normal break-words">{post.body}</p>
      {post.image && (
        <div className="h-full w-full max-w-fit">
          <Image
            src={post.image}
            alt={post.title}
            height="100"
            width="100"
            className="rounded h-full max-h-[500px] w-full object-contain"
            unoptimized
          />
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-auto h-full">
        {categories.map((category: string, index: number) => (
          <span
            key={index}
            className="bg-blue-200 text-blue-800 text-xs font-medium py-1 px-2 rounded whitespace-normal"
          >
            {category}
          </span>
        ))}
      </div>
      {isUserPost && (
        <div className="absolute top-0 left-0 right-0 flex justify-end items-center gap-3 p-2 rounded-b">
          <PostActions postId={post.id} />
        </div>
      )}
    </div>
  );
}
