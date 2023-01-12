import express from "express";

import {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const userRouter = express.Router();

//user
userRouter.get("/users", VerifyUser, getUsers);
userRouter.get("/user/:id", VerifyUser, getUser);
userRouter.post("/user", VerifyUser, addUser);
userRouter.patch("/user/:id", VerifyUser, updateUser);
userRouter.delete("/user/:id", VerifyUser, deleteUser);

export default userRouter;
