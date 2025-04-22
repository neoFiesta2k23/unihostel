import express from "express";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import studentRoute from "./routes/studentRoutes.js";
import complaintRoute from "./routes/complaintRoute.js";
import dotenv from "dotenv";
import cors from "cors"; 
import adminRoute from "./routes/adminRoutes.js";
import contactRoute from "./routes/contactRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/student", studentRoute);
app.use("/api/v1/complaints", complaintRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/contact-us", contactRoute)

await connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
