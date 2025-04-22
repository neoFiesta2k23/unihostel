import { Router } from "express";
import { availableRoom, getHostel, getStudentProfile, selectRoom, updateStudentProfile, getUserRoom } from "../controllers/studentController.js";
// import { getStudentDashboard } from "../controllers/dashboardController.js";
import { authenticateStudent } from "../middleware/authMiddleware.js";
import {upload} from "../middleware/multerMiddleware.js"
import { getAnnouncement } from "../controllers/announceController.js";

const router = Router();

// router.get("/dashboard", authenticateStudent, getStudentDashboard);
router.get("/profile", authenticateStudent, getStudentProfile); //in testing

router.post("/update", authenticateStudent, upload.single("photo"), updateStudentProfile); //in testing

router.get("/hostel", authenticateStudent, getUserRoom);
router.post("/hostel", authenticateStudent, selectRoom);

router.get("/get/hostel", authenticateStudent, getHostel);
router.get("/get/hostel/:hostel/rooms", authenticateStudent, availableRoom);

router.get("/announcements", getAnnouncement);

export default router; 