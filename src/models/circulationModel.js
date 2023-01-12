import mongoose from "mongoose";

const Circulation = mongoose.Schema({
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
  },
});

export default mongoose.model("circulations", Circulation);
