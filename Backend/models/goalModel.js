import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "true"
    },
    title: { type: String, required: true },
    desc: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Goal", goalSchema);
