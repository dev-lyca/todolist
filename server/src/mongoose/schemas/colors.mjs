import { Schema } from "mongoose";

const ColorSchema = new Schema(
  {
    hex: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Color = mongoose.model("Color", ColorSchema);
