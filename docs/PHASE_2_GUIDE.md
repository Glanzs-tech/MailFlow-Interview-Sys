# 🤖 Phase 2: AI Integration (Days 4-5)

**Timeline**: 2 days
**Goal**: Add GenAI-powered features to email campaigns

---

## 🎯 AI-Powered Feature Goals

### 🎨 Frontend

* [✔] **Email AI Generator** – Add "✨ Generate with AI" in campaign editor
* [✔] **Subject Line AI Suggestions** – Smart auto-suggestions
* [✔] **Email Personalization** – Inject contact data (e.g., `{{name}}`, `{{company}}`)
* [ ] **Send Time Optimization** – Recommend optimal send times
* [✔] **A/B Testing** – Generate and send variants of email content

### 🔧 Backend

* [✔] **OpenAI Integration** – GPT-3.5 or GPT-4 for content and subject line
* [✔] **Prompt Engineering** – Tailored prompts for marketing use cases
* [✔] **Endpoints**

  * `POST /api/ai/generate-email`
  * `POST /api/ai/generate-subject`
* [✔] **Template Engine** – Replace placeholders with contact data

---

## 🛠️ AI Tech Stack

* **OpenAI API** – Content and subject generation
* **Express.js** – API routing
* **Custom Prompt Templates** – Dynamic email/subject prompts
* **Handlebars.js / Custom Replace** – For personalization like `{{name}}`

---

## 📁 Folder Structure Updates

```bash
backend/
├── src/
│   ├── controllers/
│   │   └── aiController.js  # NEW
│   ├── routes/
│   │   └── aiRoutes.js      # NEW
```

---

## ✨ Sample AI Prompt

```js
// Subject Line Prompt
"Suggest 5 compelling subject lines for an email about our summer sale to young adults."

// Email Content Prompt
"Write a friendly promotional email announcing our summer sale on shoes. Target young adults. Limit to 120 words."
```

---

## 🧠 Personalization Example

```html
Hi {{name}},

Exciting news from {{company}} – we’re launching a special summer offer just for you!
```

Becomes:

```html
Hi Ishika,

Exciting news from Glanzs – we’re launching a special summer offer just for you!
```

---

## 🔄 Sample API Endpoints

```bash
POST /api/ai/generate-email
POST /api/ai/generate-subject
```

**Request Body:**

```json
{
  "prompt": "Write a promotional email for our product launch."
}
```

---

## 📦 NPM Dependencies

```bash
npm install openai
```

---

## 🧪 Manual Testing Checklist

* [✔] Click "Generate with AI" → content fills in
* [✔] AI subject lines are relevant
* [✔] Personalized emails replace placeholders correctly
* [✔] A/B content shows random variation
---

## ✅ Phase 2 Deliverables

* [✔] Working OpenAI integration
* [✔] Dynamic subject/content generation
* [✔] Personalized email sending logic
* [✔] Basic analytics/logging for AI usage
* [✔] Updated UI to include AI tools
* [✔] README updated with AI phase

---

**Success Criteria**: Users can generate, personalize, and optimize emails using AI with minimal manual effort.

---

