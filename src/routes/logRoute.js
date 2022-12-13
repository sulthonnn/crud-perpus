import express from "express";

import { getLogs, addLog } from "../controllers/logController.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const logRouter = express.Router();

//log
logRouter.get("/logs", VerifyUser, getLogs);
logRouter.post("/add-log", VerifyUser, addLog);

export default logRouter;
