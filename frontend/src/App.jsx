import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import EmailEditor from './components/EmailEditor';
import ContactList from './components/ContactList';
import SendEmail from './components/SendEmail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/editor" element={<EmailEditor />} />
      <Route path="/contacts" element={<ContactList />} />
      <Route path="/send" element={<SendEmail />} />
    </Routes>
  );
}

export default App;
