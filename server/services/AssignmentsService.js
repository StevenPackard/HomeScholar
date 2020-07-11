import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class AssignmentService {
  async find(query = {}) {
    return await dbContext.Assignments.find(query).populate("studentId");
  }

  // async getAll(userEmail) {
  //   return await dbContext.Assignments.find();
  // }

  async getAll(userEmail) {
    return await dbContext.Assignments.find({
      creatorEmail: userEmail,
    }).populate("studentId");
  }

  async getById(id, userEmail) {
    let data = await dbContext.Assignments.findOne({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async create(rawData) {
    let data = await dbContext.Assignments.create(rawData);
    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Assignments.findOneAndUpdate(
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
    let data = await dbContext.Assignments.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
}

export const assignmentsService = new AssignmentService();
