import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    roomType: {
      type: String,
      enum: ["single", "double", "triple", "shared"],
      default: "single",
    },
    capacity: {
      type: Number,
      default: 1,
    },
    duration: {
      type: String,
    }, 
    currentOccupants: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },
    facilities: {
      type: [String],
      default: [],
    }
  },
  { timestamps: true }
);


const Room = mongoose.model("Room", roomSchema);
export default Room;
