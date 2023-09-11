import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/threads.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const post = await fetchThreadById(params.id);
  console.log("the iddddd is", userInfo?.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={post._id}
          id={post._id}
          currentUserId={user?.id || ""}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={post._id}
          currentUserImage={user?.imageUrl}
          currentUserId={JSON.stringify(userInfo?._id) || ""}
        />
      </div>
    </section>
  );
}
