# 🚀 Phase 1: Core Platform (Days 1-3)

**Timeline**: 3 days  
**Goal**: Build essential email marketing features quickly

## 🎯 Minimum Viable Features

### 🎨 Frontend (Day 1-2)
- [✔ ] **Simple Auth** - Login/Register forms
- [ ✔] **Dashboard** - Basic campaign list view
- [ ✔] **Email Editor** - Simple text/HTML editor
- [ ✔] **Contact List** - Add/view contacts
- [ ✔] **Send Email** - Basic email sending

### 🔧 Backend (Day 2-3)
- [ ✔] **Auth API** - JWT login/register
- [ ✔] **Campaign CRUD** - Create, read, update campaigns
- [ ✔] **Contact CRUD** - Manage contact lists
- [ ✔] **Email Service** - Send emails via SendGrid/similar
- [ ✔] **Basic Analytics** - Track sent emails

## 🛠️ Quick Tech Stack

### Frontend
```bash
npx create-react-app frontend --template typescript
# or
npx create-next-app@latest frontend --typescript --tailwind
```

**Essential packages:**
- `axios` - API calls
- `react-router-dom` - Routing
- `tailwindcss` - Styling
- `react-hook-form` - Forms

### Backend
```bash
npm init -y
npm install express cors dotenv jsonwebtoken bcryptjs
npm install -D nodemon typescript @types/node
```

**Essential packages:**
- `express` - Web framework
- `jsonwebtoken` - Authentication
- `bcryptjs` - Password hashing
- `@sendgrid/mail` - Email service

## 📁 Simple Structure

```
mailflow-interview/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── utils/
│   └── package.json
└── README.md
```

## 🗄️ Simple Database (JSON files for speed)

```javascript
// data/users.json
[
  {
    "id": 1,
    "email": "user@example.com",
    "password": "hashedpassword",
    "name": "John Doe"
  }
]

// data/campaigns.json
[
  {
    "id": 1,
    "userId": 1,
    "name": "Welcome Campaign",
    "subject": "Welcome!",
    "content": "Hello there!",
    "status": "sent"
  }
]

// data/contacts.json
[
  {
    "id": 1,
    "userId": 1,
    "email": "contact@example.com",
    "name": "Jane Smith"
  }
]
```

## 🚀 3-Day Development Plan

### Day 1: Setup + Auth
- [ ✔] Initialize React + Express projects
- [ ✔] Create login/register pages
- [ ✔] Implement JWT authentication
- [ ✔] Basic routing setup

### Day 2: Core Features
- [ ✔] Dashboard with campaign list
- [ ✔] Simple email editor (textarea)
- [ ✔] Contact management (add/list)
- [ ✔] Campaign creation form

### Day 3: Email + Polish
- [ ✔] Email sending functionality
- [ ✔] Basic email templates
- [ ✔] Simple analytics (sent count)
- [ ✔] UI improvements

## 📝 Essential API Endpoints

```javascript
// Auth
POST /api/auth/login
POST /api/auth/register

// Campaigns
GET /api/campaigns
POST /api/campaigns
POST /api/campaigns/:id/send

// Contacts
GET /api/contacts
POST /api/contacts

// Analytics
GET /api/analytics/dashboard
```

## 🎨 Simple UI Components

### Login Page
```jsx
function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login to MailFlow</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
```

### Dashboard
```jsx
function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3>Total Campaigns</h3>
          <p className="text-2xl">12</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Total Contacts</h3>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Emails Sent</h3>
          <p className="text-2xl">5,678</p>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Campaign
      </button>
    </div>
  );
}
```

## ⚡ Quick Setup Commands

```bash
# Clone and setup
git clone https://github.com/YOUR_USERNAME/mailflow-interview.git
cd mailflow-interview

# Frontend setup
cd frontend
npm install
npm start

# Backend setup (new terminal)
cd backend
npm install
npm run dev
```

## 🧪 Simple Testing

Focus on manual testing:
- [ ✔] Can register/login
- [ ✔] Can create campaigns
- [ ✔] Can add contacts
- [ ✔] Can send emails
- [ ✔] Basic UI works on mobile

## 📋 Phase 1 Deliverables

By end of Day 3:
- [ ✔] Working login/register
- [ ✔] Dashboard with basic stats
- [ ✔] Campaign creation and listing
- [ ✔] Contact management
- [ ✔] Email sending capability
- [ ] Responsive design
- [✔ ] README with setup instructions

**Success Criteria**: A functional email marketing app where users can create campaigns and send emails to contacts.

---

**Keep it simple, make it work! 🚀**