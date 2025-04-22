import Student from "../models/studentModel.js";
import Hostel from "../models/hostelModel.js";
import Room from "../models/roomModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


export const adminLogin = async (req, res) => {
  const { password } = req.body;

  try {
    const isAdmin = process.env.ADMIN_PASS === password;
    if (!isAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Admin Password" });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        name: "Admin",
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllStudents = async (req, res) => {
  const students = await Student.find().select("-password");
  res.json(students);
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

export const updateStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

export const deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(400).json({ message: "Deletion failed" });
  }
};

export const addHostel = async (req, res) => {
  try {
    const {
      name, 
      gender,
      wardenName = '',
      contactNumber = '',
      totalRooms = 0,
      facilities = [],
      room = []
    } = req.body;

    const newHostel = new Hostel({
      name,
      gender,
      wardenName,
      contactNumber,
      totalRooms,
      facilities,
      room
    });

    await newHostel.save();
    res.status(201).json({ message: "Hostel created successfully", hostel: newHostel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create hostel", details: err.message });
  }
};

export const addRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      roomType = "single",
      capacity = 1,
      currentOccupants = null,
      hostel,
      facilities = []
    } = req.body;

    console.log(req.body);

    if (!hostel) {
      return res.status(400).json({ error: "Hostel ID is required" });
    }

    // Create new room
    const newRoom = new Room({
      roomNumber,
      roomType,
      capacity,
      currentOccupants,
      hostel,
      facilities
    });

    const savedRoom = await newRoom.save();

    // Push room to hostel's hostel array
    await Hostel.findByIdAndUpdate(hostel, {
      $push: { hostel: savedRoom._id }
    });

    res.status(201).json({ message: "Room added successfully", room: savedRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add room", details: err.message });
  }
}