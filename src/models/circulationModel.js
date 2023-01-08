import mongoose from "mongoose";

const Circulation = mongoose.Schema({
  book: {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  member: {
    type: String,
    required: true,
  },
  loanDate: {
    type: String,
  },
});

export default mongoose.model("circulations", Circulation);
