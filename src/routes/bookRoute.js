import express from "express";

import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const bookRouter = express.Router();

//book
bookRouter.get("/books", VerifyUser, getBooks);
bookRouter.get("/book/:id", VerifyUser, getBook);
bookRouter.post("/add-book", VerifyUser, addBook);
bookRouter.patch("/book/:id", VerifyUser, updateBook);
bookRouter.delete("/delete-book/:id", VerifyUser, deleteBook);

export default bookRouter;
