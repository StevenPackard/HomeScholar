import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import BoardSchema from "../models/Board";
import AssignmentSchema from "../models/Assignment";
import StudentSchema from "../models/Student";
class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Boards = mongoose.model("Board", BoardSchema);
  Assignments = mongoose.model("Assignment", AssignmentSchema);
  Students = mongoose.model("Student", StudentSchema);
}

export const dbContext = new DbContext();
