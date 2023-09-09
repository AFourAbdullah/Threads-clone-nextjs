"use server";

import { revalidatePath } from "next/cache";
import User from "../models/usermodel";
import { connectToDB } from "../mongoose";
interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

//function to update and create user
export async function updateUser({
  userId,
  name,
  username,
  path,
  bio,
  image,
}: Params): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

//function to get user data
export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
    // .populate({path:"communities",model:Community})
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
