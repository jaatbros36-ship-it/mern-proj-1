import mongoose from "mongoose";

const { Schema } = mongoose;

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expireat: {
      type: Date,
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

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
