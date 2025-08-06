import {
  getContactsService,
  addContactService,
  deleteContactService,
} from "../services/contact.service.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getContactsService(req.user._id);
    res.status(200).json({
      contacts,
      success: true,
      message: "Contact Fetched Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching contacts",
      success: false,
      error: err.message,
    });
  }
};

export const addContact = async (req, res) => {
  try {
    const { name, email } = req.body;

    const contact = await addContactService(req.user._id, name, email);
    res.status(201).json({
      contact,
      success: true,
      message: "Contact Added Successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Contact already exists",
        success: false,
        error: err.message,
      });
    }
    res.status(500).json({
      message: "Error adding contact",
      success: false,
      error: err.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const result = await deleteContactService(req.user._id, contactId);
    if (!result) {
      return res.status(404).json({
        message: "Contact not found",
        success: false,
        error: "Contact not found",
      });
    }
    res.status(200).json({ message: "Contact deleted", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting contact",
      success: false,
      error: err.message,
    });
  }
};
