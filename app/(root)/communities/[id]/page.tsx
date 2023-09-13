import React from "react";
import { currentUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs, profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import {
  fetchCommunities,
  fetchCommunityDetails,
} from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;
  const community = await fetchCommunityDetails(params.id);
  //the user info can be either the logged in user or any other user profile which is being viewed by curent logged in user
  return (
    <section>
      {/**there will be two types of id pass to the profile header one if the current logged in user is viewing their profile and
       * second if the current logged in user is viewing other profile
       */}
      <ProfileHeader
        accountId={community.id}
        authUserId={user.id}
        name={community.name}
        username={community.username}
        imgUrl={community.image}
        bio={community.bio}
        type="Community"
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {community.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={community._id}
              accountType="Community"
            />
          </TabsContent>
          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {community.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent value="requests" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={community._id}
              accountType="Community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
