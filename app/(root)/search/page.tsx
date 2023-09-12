import React from "react";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className="head-text">Search</h1>
      <div>
        {result.users.length === 0 ? (
          <p className="no-result">No users Yet</p>
        ) : (
          <>
            {result.users.map((user) => (
              <UserCard
                key={user.id}
                imgUrl={user.image}
                name={user.name}
                username={user.username}
                personType="User"
                id={user.id}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default page;
