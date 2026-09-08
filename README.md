# Smart Todo Manager

A modern full-stack task management application built with **React.js, Node.js, Express.js, and PostgreSQL**.

Smart Todo Manager helps users create, organize, prioritize, track, and complete tasks through an interactive single-page dashboard. It also provides smart task recommendations based on **priority, due dates, and task status**.

---

## 🚀 Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected task APIs
* Password hashing using bcrypt
* Persistent authentication

### 📋 Task Management

Users can:

* Create tasks
* Edit tasks
* Delete tasks
* View task details
* Mark tasks as completed
* Start a task
* Change task status
* Assign task priority
* Add due dates
* Add descriptions
* Assign categories

### 📊 Task Status

The application supports three task states:

```text
TODO
IN_PROGRESS
COMPLETED
```

The UI represents `TODO` tasks as **Pending**.

Task lifecycle:

```text
Create Task
     ↓
   TODO
     ↓
 Start Task
     ↓
IN_PROGRESS
     ↓
 Complete Task
     ↓
 COMPLETED
```

### 🧠 Smart Task Recommendation

The dashboard contains a Smart Assistant that recommends the next task to work on.

The recommendation considers:

1. Due date
2. Deadline urgency
3. Priority
4. Current progress
5. Task creation time

Example:

```text
Overdue
   ↓
Due Today
   ↓
Due Tomorrow
   ↓
Due Within 3 Days
   ↓
Due Within 7 Days
   ↓
Later
   ↓
No Deadline
```

Priority is then used to break ties:

```text
HIGH
  ↓
MEDIUM
  ↓
LOW
```

Completed tasks are excluded from recommendations.

### 📅 Due Date Management

Tasks can have deadlines and the dashboard can identify:

* Overdue tasks
* Tasks due today
* Tasks due tomorrow
* Upcoming tasks
* Tasks without deadlines

### 🏷️ Categories

Users can:

* Create categories
* Edit categories
* Delete categories
* Assign categories to tasks

### 🔎 Search and Filtering

The dashboard supports:

* Task search
* Pending filter
* In Progress filter
* Completed filter
* Priority filtering
* Smart sorting
* Priority sorting
* Due-date sorting
* Newest-first sorting
* Oldest-first sorting

### 📈 Productivity Insights

The dashboard provides productivity information based on the user's tasks.

Examples include:

* Total tasks
* Pending tasks
* In-progress tasks
* Completed tasks
* Completion rate
* Productivity score
* Weekly completion information

### 🎨 Modern Single-Page UI

The application uses a single dashboard instead of a traditional sidebar layout.

The interface includes:

* Top navigation bar
* Welcome section
* Statistics cards
* Smart recommendation
* Productivity insights
* Task toolbar
* Task cards
* Modal-based interactions

Modal windows are used for:

* Create Task
* Edit Task
* Task Details
* Profile
* Categories
* Delete Confirmation

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* JavaScript
* CSS3
* Lucide React
* Axios

## Backend

* Node.js
* Express.js
* JavaScript
* JWT
* bcrypt
* CORS
* dotenv

## Database

* PostgreSQL

## Development Tools

* Git
* GitHub
* VS Code
* npm

---

# 🏗️ Project Architecture

```text
Smart Todo Manager
│
├── frontend
│   │
│   ├── src
│   │   ├── assets
│   │   │   └── images
│   │   │
│   │   ├── components
│   │   │   ├── Dashboard
│   │   │   │   ├── WelcomeSection.jsx
│   │   │   │   ├── StatsCards.jsx
│   │   │   │   ├── TaskToolbar.jsx
│   │   │   │   ├── TaskList.jsx
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   ├── SmartRecommendation.jsx
│   │   │   │   └── ProductivityInsights.jsx
│   │   │   │
│   │   │   ├── Modals
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── CreateTaskModal.jsx
│   │   │   │   ├── EditTaskModal.jsx
│   │   │   │   ├── TaskDetailsModal.jsx
│   │   │   │   ├── ProfileModal.jsx
│   │   │   │   ├── CategoriesModal.jsx
│   │   │   │   └── ConfirmDeleteModal.jsx
│   │   │   │
│   │   │   ├── Navbar.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AppDashboard.jsx
│   │   │
│   │   ├── services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── taskService.js
│   │   │   └── categoryService.js
│   │   │
│   │   ├── context
│   │   │   ├── AuthContext.jsx
│   │   │   └── TaskContext.jsx
│   │   │
│   │   ├── utils
│   │   │   ├── auth.js
│   │   │   ├── formatDate.js
│   │   │   └── smartTask.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── categoryController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models
│   │   ├── userModel.js
│   │   ├── taskModel.js
│   │   └── categoryModel.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── categoryRoutes.js
│   │
│   ├── utils
│   │   ├── generateToken.js
│   │   └── validators.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# 🔄 Application Flow

## Authentication Flow

```text
User
 ↓
Register / Login
 ↓
Express API
 ↓
PostgreSQL
 ↓
JWT Token
 ↓
Frontend
 ↓
Authenticated Dashboard
```

## Task Flow

```text
React Dashboard
       ↓
TaskContext
       ↓
taskService
       ↓
Axios API
       ↓
Express Route
       ↓
Authentication Middleware
       ↓
Task Controller
       ↓
Task Model
       ↓
PostgreSQL
```

---

# 🔐 Authentication Architecture

The application uses JWT authentication.

When a user logs in:

```text
Email + Password
       ↓
Auth Controller
       ↓
Find User
       ↓
Compare Password
       ↓
Generate JWT
       ↓
Return Token
```

For protected requests:

```text
Frontend
   ↓
JWT Token
   ↓
Authorization Header
   ↓
Auth Middleware
   ↓
Verify Token
   ↓
Attach User
   ↓
Controller
```

The token is sent using:

```text
Authorization: Bearer <token>
```

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /auth/register
```

Example request:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "password123"
}
```

### Login

```http
POST /auth/login
```

Example:

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

---

# 📋 Task API

All task routes require authentication.

### Get Tasks

```http
GET /tasks
```

### Get Single Task

```http
GET /tasks/:id
```

### Create Task

```http
POST /tasks
```

Example:

```json
{
    "title": "Complete project",
    "description": "Finish the Smart Todo Manager project",
    "priority": "HIGH",
    "status": "TODO",
    "due_date": "2026-09-15",
    "category_id": 1
}
```

### Update Task

```http
PUT /tasks/:id
```

### Delete Task

```http
DELETE /tasks/:id
```

### Change Task Status

```http
PATCH /tasks/:id/status
```

Example:

```json
{
    "status": "IN_PROGRESS"
}
```

The status endpoint is used for:

```text
TODO → IN_PROGRESS
TODO → COMPLETED
IN_PROGRESS → COMPLETED
COMPLETED → TODO
```

---

# 🏷️ Category API

### Get Categories

```http
GET /categories
```

### Create Category

```http
POST /categories
```

### Update Category

```http
PUT /categories/:id
```

### Delete Category

```http
DELETE /categories/:id
```

---

# 🗄️ Database

PostgreSQL is used as the primary database.

The main entities are:

```text
users
  │
  ├──────────────┐
  │              │
  ↓              ↓
tasks        categories
```

A task belongs to a user and can optionally belong to a category.

Conceptually:

```text
User
 │
 ├── Task
 │    ├── Title
 │    ├── Description
 │    ├── Priority
 │    ├── Status
 │    ├── Due Date
 │    └── Category
 │
 └── Categories
```

---

# ⚙️ Environment Variables

## Backend

Create:

```text
server/.env
```

Example:

```env
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/smart_todo

JWT_SECRET=your_super_secret_key

NODE_ENV=development
```

Do not commit `.env` to GitHub.

---

## Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000
```

Use the actual API URL when deploying the backend.

---

# 📦 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-todo.git
```

Move into the project:

```bash
cd smart-todo
```

---

# 🖥️ Backend Setup

Open a terminal:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Configure:

```text
server/.env
```

with your PostgreSQL credentials.

Start the backend:

```bash
npm start
```

or, if a development script is configured:

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:5000
```

---

# 🌐 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Vite will provide a local URL, normally similar to:

```text
http://localhost:5173
```

---

# 🧪 Testing the Application

After starting both servers:

### 1. Register

Create a new user account.

### 2. Login

Login using the registered credentials.

### 3. Create a Category

Open:

```text
Categories
```

and create a category.

### 4. Create a Task

Click:

```text
Create Task
```

Add:

* Title
* Description
* Priority
* Due date
* Category

### 5. Start a Task

Click:

```text
Start Task
```

The task changes:

```text
TODO
 ↓
IN_PROGRESS
```

The button changes to:

```text
Task In Progress
```

### 6. Complete the Task

Use the task checkbox.

The status changes:

```text
IN_PROGRESS
 ↓
COMPLETED
```

### 7. Test Filters

The filters should work as:

```text
Pending
   ↓
TODO tasks

In Progress
   ↓
IN_PROGRESS tasks

Completed
   ↓
COMPLETED tasks
```

---

# 🧠 Smart Recommendation Logic

The Smart Assistant automatically selects the most useful pending task.

Completed tasks are ignored.

The system first considers deadline urgency:

```text
1. Overdue
2. Due Today
3. Due Tomorrow
4. Due Within 3 Days
5. Due Within 7 Days
6. Later
7. No Deadline
```

Then priority:

```text
HIGH
MEDIUM
LOW
```

Then current progress:

```text
IN_PROGRESS
TODO
```

Finally, task creation time is used as a tie-breaker.

This prevents the application from simply recommending the first task returned from the database.

---

# 🎯 Design Goals

The project focuses on:

* Simplicity
* Productivity
* Fast task management
* Clean user experience
* Responsive design
* Smart recommendations
* Minimal navigation
* Modal-based interactions
* Clear task status visibility

Instead of using a traditional sidebar, the application keeps the main functionality accessible from a single dashboard.

---

# 📱 Responsive Design

The UI is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

On smaller screens:

* Navigation actions adapt
* Task cards resize
* Filters become compact
* Modals fit the viewport
* Create Task controls remain accessible

---

# 🔒 Security

The application uses several security practices:

* Password hashing with bcrypt
* JWT authentication
* Protected API routes
* User-specific task queries
* Environment variables for secrets
* CORS configuration
* Input validation

Users can only access their own tasks and categories.

---

# 🚧 Future Improvements

Planned improvements may include:

* Drag-and-drop task management
* Calendar view
* Recurring tasks
* Task reminders
* Email notifications
* Dark mode
* Advanced analytics
* Productivity charts
* AI-generated task breakdown
* AI task prioritization
* Natural-language task creation
* Subtasks
* Task attachments
* Collaboration
* Shared task lists
* Real-time updates
* Mobile application

---

# 📸 Project Screens

Add screenshots of the application here:

```text
docs/
├── dashboard.png
├── create-task.png
├── task-details.png
├── categories.png
└── profile.png
```

Example:

```markdown
![Dashboard](docs/dashboard.png)
```

---

# 🤝 Contributing

Contributions are welcome.

### Fork the repository

```bash
git fork
```

### Create a branch

```bash
git checkout -b feature/new-feature
```

### Make changes

```bash
git add .
```

### Commit

```bash
git commit -m "Add new feature"
```

### Push

```bash
git push origin feature/new-feature
```

Then create a Pull Request.

---

# 📄 License

This project is available for educational and development purposes.

---

# 👨‍💻 Author

**Saiteja Elukapally**

Full-Stack Developer

### Technologies

```text
React.js
Node.js
Express.js
PostgreSQL
JavaScript
JWT
Git
```

---

# ⭐ Project Summary

Smart Todo Manager is a full-stack productivity application designed to provide a simple but intelligent way to manage daily tasks.

The application combines traditional task management with smart recommendations so users can quickly understand:

```text
What should I do?
        ↓
Why should I do it?
        ↓
When is it due?
        ↓
What is its priority?
        ↓
Is it currently in progress?
```

The goal is to turn a basic todo application into a more useful **personal productivity dashboard**.
