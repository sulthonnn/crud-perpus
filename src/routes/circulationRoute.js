import { verify } from "argon2";
import express from "express";

import {
  getCirculation,
  getCirculations,
  createCirculation,
  updateCirculation,
  deleteCirculation,
} from "../controllers/circulationController.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const circulationRouter = express.Router();

//cirulation
circulationRouter.get("/circulations", VerifyUser, getCirculations);
circulationRouter.get("/circulation/:id", VerifyUser, getCirculation);
circulationRouter.post("/add-circulation", VerifyUser, createCirculation);
circulationRouter.patch("/circulation/:id", VerifyUser, updateCirculation);
circulationRouter.delete(
  "/delete-circulation/:id",
  VerifyUser,
  deleteCirculation
);

export default circulationRouter;
