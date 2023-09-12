import { fetchThreadsOfUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchThreadsOfUser(accountId);

  if (!result) {
    redirect("/");
  }
  return <section>ThreadsTab</section>;
};

export default ThreadsTab;
