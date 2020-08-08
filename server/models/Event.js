import mongoose from "mongoose";
let Schema = mongoose.Schema;

const Event = new Schema(
  {
    creatorEmail: { type: String, required: true },
    postId: { type: String },
    title: { type: String, required: true },
    body: { type: String, required: true },
    start: { type: Date },
    end: { type: Date },
    type: {
      type: String,
      enum: ["remote", "inPerson", "unspecified"],
      default: "unspecified",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
export default Event;
