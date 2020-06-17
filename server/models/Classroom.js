import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Classroom = new Schema(
  {
    title: { type: String, required: true },
    gradeLevel: { type: Number, min: 1, max: 12, required: true },
    creatorEmail: { type: String, required: true },
    teachers: [{ type: String }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Classroom.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

//CASCADE ON DELETE
// Classroom.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     dbContext.List.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Classroom;
