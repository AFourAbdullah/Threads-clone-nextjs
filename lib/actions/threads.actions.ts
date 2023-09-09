"use server";
import { connectToDB } from "../mongoose";
import Thread from "../models/threadmodel";
import User from "../models/usermodel";
// import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    //we also need to update the user for controlling who created the thread and which threads belong to a specific user
    await User.findByIdAndUpdate(author, {
      $push: {
        threads: createdThread._id,
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread because : ${error.message}`);
  }
  // cons
}
export async function fetchThreads(pageNum = 1, pageSize = 20) {
  connectToDB();
  const skipAmount = (pageNum - 1) * pageSize; //pagenum=1 means no skip i.e we are on first page viewing the first 20 threads

  //   we will find top level thread that are not comments
  const postsQuery = Thread.find({
    parentId: { $in: [null, undefined] },
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    // .populate({
    //   path: "community",
    //   model: Community,
    // })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();
  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}
