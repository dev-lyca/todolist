import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      index: true,
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1, provider: 1 }, { unique: true });

export default mongoose.model("User", UserSchema);
