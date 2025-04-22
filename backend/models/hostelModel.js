import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "co-ed"],
      required: true,
    },
    wardenName: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    totalRooms: {
      type: Number,
      default: 0,
    },
    facilities: {
      type: [String],
      default: [],
    },
    room: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }],
  },
  { timestamps: true }
);

const Hostel = mongoose.model("Hostel", hostelSchema);
export default Hostel;
