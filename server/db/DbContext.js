import mongoose from "mongoose";
import EventSchema from "../models/Event";
import ProfileSchema from "../models/Profile";
import AssignmentSchema from "../models/Assignment";
import StudentSchema from "../models/Student";
import PostSchema from "../models/Post";
import CommentSchema from "../models/Comment";
class DbContext {
  Events = mongoose.model("Event", EventSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Assignments = mongoose.model("Assignment", AssignmentSchema);
  Students = mongoose.model("Student", StudentSchema);
  Comments = mongoose.model("Comment", CommentSchema);
  Posts = mongoose.model("Post", PostSchema);
}

export const dbContext = new DbContext();
