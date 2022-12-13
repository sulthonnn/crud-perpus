import mongoose from "mongoose";

const Circulation = mongoose.Schema({
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
    type: String,
  },
});

export default mongoose.model("circulations", Circulation);
