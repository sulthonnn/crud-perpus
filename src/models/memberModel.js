import mongoose from "mongoose";
import "mongoose-type-email";

const Member = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minLength: 11,
      maxLength: 13,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("members", Member);
