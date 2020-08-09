import mongoose from "mongoose";
let Schema = mongoose.Schema;

const Post = new Schema(
  {
    virtual: { type: Boolean, default: false },
    title: { type: String, required: true },
    body: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    isEvent: { type: Boolean, default: false },
    start: { type: Date, default: null },
    end: { type: Date, default: null },
    type: {
      type: String,
      enum: ["remote", "inPerson", "unspecified"],
      default: "unspecified",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Post.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Post;
