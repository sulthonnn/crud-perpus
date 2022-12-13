import express from "express";

import {
  getMembers,
  getMember,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const memberRouter = express.Router();

//member
memberRouter.get("/members", VerifyUser, getMembers);
memberRouter.get("/member/:id", VerifyUser, getMember);
memberRouter.post("/add-member", VerifyUser, addMember);
memberRouter.patch("/member/:id", VerifyUser, updateMember);
memberRouter.delete("/delete-member/:id", VerifyUser, deleteMember);

export default memberRouter;
