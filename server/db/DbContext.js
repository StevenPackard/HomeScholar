import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import AssignmentSchema from "../models/Assignment";
import StudentSchema from "../models/Student";
import PostSchema from "../models/Post";
import CommentSchema from "../models/Comment";
import EventSchema from "../models/Event";
class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Assignments = mongoose.model("Assignment", AssignmentSchema);
  Students = mongoose.model("Student", StudentSchema);
  Comments = mongoose.model("Comment", CommentSchema);
  Posts = mongoose.model("Post", PostSchema);
  Events = mongoose.model("Post", EventSchema);
}

export const dbContext = new DbContext();
