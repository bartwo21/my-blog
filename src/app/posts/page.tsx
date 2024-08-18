import PostList from "@/components/posts-list";
import { Suspense } from "react";
import Loading from "../../components/loadingComponent";

export default async function Page() {
  return (
    <main className="text-center pt-16 px-5">
      <h2 className="text-3xl md:text-5xl font-bold mb-5">All posts</h2>
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </main>
  );
}
