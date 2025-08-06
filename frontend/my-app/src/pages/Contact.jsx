import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contact.css";
import { Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setContacts(res?.data?.contacts);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/contact`, newContact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Contact added successfully!");
      setContacts((prev) => [res?.data.contact, ...prev]);
      setNewContact({ name: "", email: "" });
    } catch (err) {
      toast.error("Failed to add contact. Please try again.");
      console.error("Error adding contact:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast.success("Contact deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete contact. Please try again.");
      console.error("Error deleting contact:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="contact-page">
      <ToastContainer />
      <div className="contact-container">
        <h1>Contact List</h1>

        <form className="contact-form" onSubmit={handleAddContact}>
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) =>
              setNewContact((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
          <button type="submit">Add Contact</button>
        </form>

        {loading ? (
          <p>Loading contacts...</p>
        ) : (
          <ul className="contact-list">
            {contacts.map((contact) => (
              <li key={contact._id} className="contact-item">
                <div>
                  <strong>{contact.name}</strong>
                  <p>{contact.email}</p>
                  <small>
                    Created: {new Date(contact.createdAt).toLocaleString()}
                  </small>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(contact._id)}
                >
                  <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Contact;
