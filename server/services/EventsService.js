import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class EventsService {
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
