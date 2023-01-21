import express from "express";

import {
  getCirculation,
  getCirculations,
  getPaginatedCirculations,
  createCirculation,
  updateCirculation,
  deleteCirculation,
} from "../controllers/circulationController.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const circulationRouter = express.Router();

//cirulation
circulationRouter.get("/circulations", VerifyUser, getCirculations);
circulationRouter.get("/circulation", VerifyUser, getPaginatedCirculations);
circulationRouter.get("/circulation/:id", VerifyUser, getCirculation);
circulationRouter.post("/circulation", VerifyUser, createCirculation);
circulationRouter.patch("/circulation/:id", VerifyUser, updateCirculation);
circulationRouter.delete("/circulation/:id", VerifyUser, deleteCirculation);

export default circulationRouter;
