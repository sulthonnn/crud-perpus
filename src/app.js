import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

import userRouter from "./routes/userRoute.js";
import bookRouter from "./routes/bookRoute.js";
import memberRouter from "./routes/memberRoute.js";
import circulationRouter from "./routes/circulationRoute.js";
import logRouter from "./routes/logRoute.js";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const { APP_PORT, MONGODB_NAME, DB, SESSION_SECRET } = process.env;

// mongodb+srv://username:<password>@cluster0.jwhegfm.mongodb.net/?retryWrites=true&w=majority
const uri = DB;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: uri,
      dbName: MONGODB_NAME,
    }),
    cookie: {
      secure: "auto",
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "https://stulib.netlify.app",
  })
);

app.use(express.json());
app.use(userRouter);
app.use(bookRouter);
app.use(memberRouter);
app.use(circulationRouter);
app.use(logRouter);
app.use(authRouter);

await mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(APP_PORT, () => {
      console.log(`App is listening at http://localhost:${APP_PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });
