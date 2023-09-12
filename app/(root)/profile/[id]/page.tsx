import React from "react";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section>
      {/**there will be two types of id pass to the profile header one if the current logged in user is viewing their profile and
       * second if the current logged in user is viewing other profile
       */}
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
    </section>
  );
};

export default page;
