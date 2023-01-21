import express from "express";

import {
  getBooks,
  getPaginatedBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const bookRouter = express.Router();

//book
bookRouter.get("/books", VerifyUser, getBooks);
bookRouter.get("/book", VerifyUser, getPaginatedBooks);
bookRouter.get("/book/:id", VerifyUser, getBook);
bookRouter.post("/book", VerifyUser, addBook);
bookRouter.patch("/book/:id", VerifyUser, updateBook);
bookRouter.delete("/book/:id", VerifyUser, deleteBook);

export default bookRouter;
