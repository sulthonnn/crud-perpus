import mongoose from "mongoose";

const LogBook = mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.String,
    ref: "books",
    required: true,
  },
  member: {
    type: mongoose.Schema.Types.String,
    ref: "members",
    required: true,
  },
  loanDate: {
    type: mongoose.Schema.Types.String,
    ref: "circulations",
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
});

export default mongoose.model("logs", LogBook);
