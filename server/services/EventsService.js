import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class EventsService {
  async delete(id, email) {
    let data = await dbContext.Events.findByIdAndDelete({ _id: id, new: true });
    return data;
  }
  async create(rawData) {
    let data = await dbContext.Events.create(rawData);
    return data;
  }
  async find(userEmail) {
    let res = await dbContext.Events.find({ creatorEmail: userEmail });
    return res;
  }
}

export const eventsService = new EventsService();
