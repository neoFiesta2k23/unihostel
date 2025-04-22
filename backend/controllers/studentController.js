import Student from "../models/studentModel.js";
import dotenv from "dotenv";
import Hostel from "../models/hostelModel.js";
import Room from "../models/roomModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
dotenv.config();




//get Student profile
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select("-password");
    // const student = await Student.findById(req.params.id).select("-password");
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({
      success: true,
      message: "Student profile fetched successfully",
      data: student
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



//update student profile
export const updateStudentProfile = async (req, res) => {
  const {
    gender,
    dateOfBirth,
    bloodGroup,
    phoneNumber,
    department,
    program,
    semester,
    fatherName,
    fatherContact,
    motherName,
    motherContact,
    presentAddress,
    permanentAddress
  } = req.body;

  try {
    const user = await Student.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const avatarLocalPath = req.file?.path;

    const avatar = avatarLocalPath ? await uploadOnCloudinary(avatarLocalPath) : user.avatar;



    user.gender = gender || user.gender;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.bloodGroup = bloodGroup || user.bloodGroup;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.department = department || user.department;
    user.program = program || user.program;
    user.semester = semester || user.semester;
    user.fatherName = fatherName || user.fatherName;
    user.fatherContact = fatherContact || user.fatherContact;
    user.motherName = motherName || user.motherName;
    user.motherContact = motherContact || user.motherContact;
    user.presentAddress = presentAddress || user.presentAddress;
    user.permanentAddress = permanentAddress || user.permanentAddress;
    user.avatar = avatar?.url || user.avatar;


    await user.save();
    res.json({
      success: true,
      message: "Student profile updated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

//add hostel-room
// export const selectRoom = async (req, res) => {
//   try {
//     const studentId = req.user._id;
//     const { roomId } = req.body;

//     if (!roomId) {
//       return res.status(400).json({ error: "Room ID is required" });
//     }

//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ error: "Student not found" });
//     }

//     const room = await Room.findById(roomId).populate("hostel");
//     if (!room) {
//       return res.status(404).json({ error: "Room not found" });
//     }

//     if (room.currentOccupants) {
//       return res.status(400).json({ error: "Room already occupied" });
//     }

//     // Check gender compatibility (optional)
//     if (room.hostel.gender !== student.gender && room.hostel.gender !== "co-ed") {
//       return res.status(403).json({ error: "Room not allowed for your gender" });
//     }

//     // Assign student to room
//     room.currentOccupants = studentId;
//     await room.save();

//     student.room = roomId;
//     await student.save();

//     res.status(200).json({
//       message: "Room selected successfully",
//       room,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: "Server error",
//       details: err.message,
//     });
//   }
// };

export const selectRoom = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { roomNumber, hostel, duration } = req.body;

    if (!hostel) {
      return res.status(400).json({ success: false, message: "Hostel ID is required" });
    }
    
    // ✅ Check if student already has a room
    const existingRoom = await Room.findOne({ currentOccupants: studentId });

    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: "Your Room is already allocated. You can't allocate it again!!",
      });
    }

    

    // ✅ Create new room
    const newRoom = new Room({
      roomNumber,
      currentOccupants: studentId,
      hostel,
      duration,
      facilities: [],
    });

    const savedRoom = await newRoom.save();

    // ✅ Assign room to student
    const student = await Student.findById(studentId);
    student.room = savedRoom._id;
    await student.save();

    // ✅ Add room to hostel's list
    await Hostel.findByIdAndUpdate(hostel, {
      $push: { room: savedRoom._id },
    });

    return res.status(201).json({
      success: true,
      message: "Room added successfully",
      room: savedRoom,
    });
  } catch (err) {
    console.error("selectRoom error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to add room",
      details: err.message,
    });
  }
};

export const availableRoom = async (req, res) => {
  const { hostel } = req.params;


  try {
    const hostelInfo = await Hostel.findById(hostel).populate("room");

    const rooms = hostelInfo.room; // hostelInfo.hostel is an array of Room documents
    const totalRooms = hostelInfo.totalRooms;

    // Extract existing room numbers (as integers)
    const occupiedRoomNumbers = rooms.map(room => parseInt(room.roomNumber));

    // Find all room numbers from 1 to totalRooms that are not in occupiedRoomNumbers
    const availableRooms = [];

    for (let i = 1; i <= totalRooms; i++) {
      if (!occupiedRoomNumbers.includes(i)) {
        availableRooms.push(i);
      }
    }

    res.status(200).json({
      availableRoomNumbers: availableRooms,
      totalRooms,
      occupiedRoomNumbers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch available rooms",
      details: err.message,
    });
  }
};


export const getHostel = async (req, res) => {
  try {
    const user = await Student.findById(req.user._id);
    if (!user.gender) {
      return res.status(404).json({ success: false, message: "First Update Your Profile then you can select Room" });
    }
    const hostel = await Hostel.find({ gender: user.gender });
    res.status(200).json({ success: true, hostel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch room", details: err.message });
  }
}


export const getUserRoom = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate("room");
    if (student.room == null || student.room == undefined) {
      return res.status(200).json({ success: false, message: "Room not found", data: null });
    }
    const hostel = await Room.findById(student.room._id).populate("hostel").select("-hostel.room");

    res.status(200).json({ success: true, data: hostel });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch room", details: err.message });
  }
}