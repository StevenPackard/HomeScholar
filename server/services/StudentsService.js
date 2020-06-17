import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class StudentService {
  async find(query = {}) {
    return await dbContext.Students.find(query);
  }
  async getAll(userEmail) {
    return await dbContext.Students.find({
      creatorEmail: userEmail,
    }).populate("creator", "name picture");
  }

  async getById(id, userEmail) {
    let data = await dbContext.Students.findOne({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async create(rawData) {
    let data = await dbContext.Students.create(rawData);
    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Students.findOneAndUpdate(
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
    let data = await dbContext.Students.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
}

export const studentsService = new StudentService();
