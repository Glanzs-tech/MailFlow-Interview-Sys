// routes/contact.routes.js
import { Router } from "express";
import {
  getAllContacts,
  addContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getAllContacts);
router.post("/", authenticate, addContact);
router.delete("/:contactId", authenticate, deleteContact);

export default router;

// in contacts for user getAll contacts
// for user add a contact in their list
// for user delete a contact from their list
