import Complaint from "../models/complaintModel.js";

//for student
export const createComplaint = async (req, res) => {
  const { title, category, description, roomNumber } = req.body;

  try {
    const complaint = new Complaint({
      student: req.user._id,
      title,
      category,
      description,
      roomNumber,
    });

    const saved = await complaint.save();
    console.log(saved);
    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({success: false, message: "Error submitting complaint" });
  }
};

//for student
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Complaints fetched successfully",
      data: complaints
    });
  } catch (err) {
    res.status(500).json({success: false, message: "Error fetching complaints" });
  }
};

//for admin
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate(
      "student",
      "name studentID email"
    );
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

//for admin
export const updateComplaintStatus = async (req, res) => {
  const { status, adminResponse } = req.body;

  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status || complaint.status;
    complaint.adminResponse = adminResponse || complaint.adminResponse;

    const updated = await complaint.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating complaint" });
  }
};
