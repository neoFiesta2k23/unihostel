import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Contact route");
});

router.get("/get", getContacts);
router.post("/create", createContact);



export default router;