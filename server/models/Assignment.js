import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Assignment = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true, lowercase: true },
    studentId: { type: ObjectId, ref: "Student", required: true },
    published: { type: Boolean, default: true },
    completed: { type: Boolean, default: false },
    score: { type: Number, min: 0, max: 100 },
    passed: {
      type: String,
      enum: ["Passed", "Failed", "Ungraded"],
      default: "Ungraded",
    },
    date: { type: Date },
    start: { type: Date },
    end: { type: Date },
    allDay: { type: Boolean, default: false },
    note: { type: String },
    creatorEmail: { type: String, required: true },
    backgroundColor: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Assignment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

//CASCADE ON DELETE
// Assignment.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     dbContext.List.deleteMany({ assignmentId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Assignment;
