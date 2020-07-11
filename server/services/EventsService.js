import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class EventsService {
  async getEventsByPostId(id) {
    let res = await dbContext.Events.find({ postId: id });
    return res;
  }
  async create(rawData) {
    let data = await dbContext.Events.create(rawData);
    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Events.findOneAndUpdate(
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
    let data = await dbContext.Events.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
}

export const eventsService = new EventsService();
