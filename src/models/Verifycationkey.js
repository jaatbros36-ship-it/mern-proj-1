import mongoose from "mongoose";

const { Schema } = mongoose;

const verifycationKeySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    deleteat: {
      type: Date,
      required: true,
      expires: 0
    }
  },
  { timestamps: true },
);

export default mongoose.models.verifycationkey || mongoose.model("verifycationkey", verifycationKeySchema);
