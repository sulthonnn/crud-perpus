import mongoose from "mongoose";

const LogBook = mongoose.Schema({
  book: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  member: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  loanDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
});

export default mongoose.model("logs", LogBook);
