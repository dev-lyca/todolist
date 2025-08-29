import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);
