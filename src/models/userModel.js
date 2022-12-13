import mongoose from "mongoose";
import "mongoose-type-email";

const User = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("users", User);
