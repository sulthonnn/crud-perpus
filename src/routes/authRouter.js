import express from "express";

import { Login, Logout, Me } from "../controllers/authController.js";

const authRouter = express.Router();

//auth
authRouter.get("/me", Me);
authRouter.post("/login", Login);
authRouter.delete("/logout", Logout);

export default authRouter;
