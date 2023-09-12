import React from "react";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  console.log("userringfo ise", userInfo);
  const activity = await getActivity(userInfo?._id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section>
      <h1>Activity</h1>
      <section>
        {activity.length > 0 ? (
          activity.map((item) => (
            <Link key={item._id} href={`/thread/${item.parentId}`}>
              <article className="activity-card">
                <Image
                  src={item.author.image}
                  alt="user_logo"
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {item.author.name}
                  </span>{" "}
                  replied to your thread
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className="no-result">No Activities yet</p>
        )}
      </section>
    </section>
  );
};

export default page;
