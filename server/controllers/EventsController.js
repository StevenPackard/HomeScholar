import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService";

//PUBLIC
export class EventsController extends BaseController {
  constructor() {
    super("api/events");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .post("", this.create)
      .get("", this.find)
      .delete("/:id", this.delete);
    // .put("/:id", this.edit)
    // .delete("/:id", this.delete);
  }

  async create(req, res, next) {
    try {
      // let rawData = {
      //   postId: req.body._id,
      //   body: req.body.body,
      //   title: req.body.title,
      //   start: req.body.start,
      //   end: req.body.end,
      //   creatorEmail: req.userInfo.email,
      // };
      req.body.creatorEmail = req.userInfo.email;
      req.body.postId = req.body._id;
      let data = await eventsService.create(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      let data = await eventsService.find(req.userInfo.email);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await eventsService.delete(req.params.id, req.userInfo.email);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
