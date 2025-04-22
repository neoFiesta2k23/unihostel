import mongoose from "mongoose";

const announceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announceSchema);
export default Announcement;
