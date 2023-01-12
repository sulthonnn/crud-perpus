import express from "express";

import { getLogs, addLog, deleteLog } from "../controllers/logController.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const logRouter = express.Router();

//log
logRouter.get("/logs", VerifyUser, getLogs);
logRouter.post("/log", VerifyUser, addLog);
logRouter.delete("/log/:id", VerifyUser, deleteLog);

export default logRouter;
