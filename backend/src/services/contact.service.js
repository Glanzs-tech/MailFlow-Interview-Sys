import { Contact } from "../models/Contact.js";

export const getContactsService = async (ownerUserId) => {
  return await Contact.find({ owner: ownerUserId }).sort({ createdAt: -1 });
};

export const addContactService = async (ownerUserId, name, email) => {
  const newContact = new Contact({
    owner: ownerUserId,
    name,
    email,
  });
  return await newContact.save();
};

export const deleteContactService = async (ownerUserId, contactId) => {
  return await Contact.findOneAndDelete({
    _id: contactId,
    owner: ownerUserId,
  });
};
