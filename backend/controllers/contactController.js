import Contact from "../models/contactModel.js";

// Create a new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;

    const newContact = new Contact({ name, email, message, subject });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message received successfully", data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create contact", error: error.message });
  }
};

// Get all contact messages
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error: error.message });
  }
};

// Get a single contact message by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contact", error: error.message });
  }
};

// Delete a contact message by ID
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error: error.message });
  }
};
