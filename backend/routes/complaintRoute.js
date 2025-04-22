import Router from "express";
import { createComplaint } from "../controllers/complaintController.js";
import { getMyComplaints } from "../controllers/complaintController.js";
import { getAllComplaints } from "../controllers/complaintController.js";
import { updateComplaintStatus } from "../controllers/complaintController.js";
import { authenticateStudent } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", authenticateStudent, createComplaint);
router.get("/me", authenticateStudent, getMyComplaints);
router.get("/admin/all", getAllComplaints);
router.put("/admin/update/:id", updateComplaintStatus);

export default router;