import mongoose from "mongoose";
let Schema = mongoose.Schema;

const Comment = new Schema(
  {
    body: { type: String, required: true },
    postId: { type: String, required: true },
    creatorEmail: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Comment;
