import express from "express";
import {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addHostel,
  addRoom,
  adminLogin,
} from "../controllers/adminController.js";
import { createAnnouncement } from "../controllers/announceController.js";
import { getAllComplaints, updateComplaintStatus } from "../controllers/complaintController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin route");
})

router.post("/login", adminLogin);

router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.put("/students/:id", updateStudentById);
router.delete("/students/:id", deleteStudentById);

router.post("/announcement/create", createAnnouncement);

router.post("/add/hostel", addHostel);
router.post('/add/room', addRoom);

router.get("/complaint/all", getAllComplaints);
router.put("/complaint/update/:id", updateComplaintStatus);


export default router;
