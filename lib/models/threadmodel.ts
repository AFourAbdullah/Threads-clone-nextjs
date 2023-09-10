import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  //parent id in case if thread is a comment
  parentId: {
    type: String,
  },
  //parent id in case if thread has  comments and those comment can also have children i.e a  multilevel commenting functioanlity

  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;


// https://www.canva.com/design/DAFuC8qTgQE/Gno_2I9f3_kzjd5ng_iDNg/edit