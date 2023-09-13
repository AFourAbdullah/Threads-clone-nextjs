import React from "react";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/SearchBar";
const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className="head-text">Search</h1>
      <Searchbar routeType="search" />
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
