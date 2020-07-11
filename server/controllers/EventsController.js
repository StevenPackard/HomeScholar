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
      .get("", this.find);
    // .put("/:id", this.edit)
    // .delete("/:id", this.delete);
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
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

  // async edit(req, res, next) {
  //   try {
  //     let data = await eventsService.edit(
  //       req.params.id,
  //       req.userInfo.email,
  //       req.body
  //     );
  //     return res.send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async delete(req, res, next) {
  //   try {
  //     await eventsService.delete(req.params.id, req.userInfo.email);
  //     return res.send("Successfully deleted");
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
