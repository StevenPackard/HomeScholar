import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {
  async getCommentsByPostId(id) {
    let res = await dbContext.Comments.find({ postId: id }).populate(
      "creator",
      "name picture"
    );
    return res;
  }
  async create(rawData) {
    let data = await dbContext.Comments.create(rawData);
    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Comments.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Comments.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
}

export const commentsService = new CommentsService();