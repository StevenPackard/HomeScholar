import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class EventsService {
  async delete(id, email) {
    let data = await dbContext.Events.findByIdAndDelete({ _id: id, new: true });
    return data;
  }
  async create(rawData) {
    let isNewEvent = await dbContext.Events.find({ postId: rawData.postId });
    if (isNewEvent.length <= 0) {
      let data = await dbContext.Events.create(rawData);
      return data;
    }
    return null;
  }
  async find(userEmail) {
    let res = await dbContext.Events.find({ creatorEmail: userEmail });
    return res;
  }
}

export const eventsService = new EventsService();
