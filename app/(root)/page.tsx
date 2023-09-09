import { fetchThreads } from "@/lib/actions/threads.actions";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchThreads(1, 30);
  console.log("threadss:", result);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
    </>
  );
}
