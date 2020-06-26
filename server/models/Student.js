import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
import { dbContext } from "../db/DbContext";

const Student = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    gradeLevel: { type: String, required: true },
    subjects: [{ type: String }],
    creatorEmail: { type: String, required: true },
    backgroundColor: { type: String, default: "#fd7e14" },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Student.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

// CASCADE ON DELETE
Student.pre("findOneAndRemove", function (next) {
  //lets find all the lists and remove them
  Promise.all([
    dbContext.Assignments.deleteMany({ studentId: this._conditions._id }),
  ])
    .then(() => next())
    .catch((err) => next(err));
});

export default Student;
