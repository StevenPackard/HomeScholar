import mongoose from "mongoose";
let Schema = mongoose.Schema;

const Event = new Schema(
  {
    creatorEmail: { type: String, required: true },
    postId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    start: { type: Date },
    end: { type: Date },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
export default Event;
