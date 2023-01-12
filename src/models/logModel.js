import mongoose from "mongoose";

const LogBook = mongoose.Schema({
  book: {
    type: String,
    required: true,
  },
  member: {
    type: String,
    required: true,
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
