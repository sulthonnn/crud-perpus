import mongoose from "mongoose";

//buku
const Book = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
      maxLength: 4,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("books", Book);
