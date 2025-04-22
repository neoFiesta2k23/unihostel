import Announcement from "../models/announceModel.js";

export const getAnnouncement = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Announcements fetched successfully",
            data: announcements,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching announcements" });
    }
};

export const createAnnouncement = async (req, res) => {
    const { title, description, createdBy } = req.body;
    try {

        const announcement = new Announcement({ title, description, createdBy });
        const saved = await announcement.save();

        res.status(201).json({
            success: true,
            message: "Announcement created successfully",
            data: saved,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
