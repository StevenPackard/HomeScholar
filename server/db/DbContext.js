import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import BoardSchema from "../models/Board";
import AssignmentSchema from "../models/Assignment";
import StudentSchema from "../models/Student";
import PostSchema from "../models/Post";
import CommentSchema from "../models/Comment";
class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Boards = mongoose.model("Board", BoardSchema);
  Assignments = mongoose.model("Assignment", AssignmentSchema);
  Students = mongoose.model("Student", StudentSchema);
  Comments = mongoose.model("Comment", CommentSchema);
  Posts = mongoose.model("Post", PostSchema);
}

export const dbContext = new DbContext();
