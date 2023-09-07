import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  const user = await currentUser();
  const userInfo = {};
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: user?.username || userInfo?.username,
    name: user?.firstName || userInfo?.name,
    bio: userInfo?.bio || "",
    image: user?.imageUrl || userInfo?.image,
  };
  return (
    <main className="px-10 py-20 flex max-w-3xl flex-col justify-start mx-auto">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete Your Profile To Use Threads
      </p>
      <section className="bg-dark-2 mt-9 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}
