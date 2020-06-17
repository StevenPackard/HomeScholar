import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { studentsService } from "../services/StudentsService";
import { assignmentsService } from "../services/AssignmentsService";

//PUBLIC
export class StudentsController extends BaseController {
  constructor() {
    super("api/students");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/assignments", this.getAssignmentsByStudentId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      //only gets students by user who is logged in
      let data = await studentsService.getAll(req.userInfo.email);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await studentsService.getById(
        req.params.id,
        req.userInfo.email
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAssignmentsByStudentId(req, res, next) {
    try {
      let data = await assignmentsService.find({ studentId: req.params.id });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await studentsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await studentsService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await studentsService.delete(req.params.id, req.userInfo.email);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
