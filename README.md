# LearnSpace 🎓

![LearnSpace](https://img.shields.io/badge/LearnSpace-Task%20Management%20System-blue?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/HimanshiSh03/LearnSpace?style=social)
![GitHub forks](https://img.shields.io/github/forks/HimanshiSh03/LearnSpace?style=social)
![GitHub license](https://img.shields.io/github/license/HimanshiSh03/LearnSpace)

A Modern Task & Learning Management System 
[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Project Structure](#-project-structure) • [Usage](#-usage) • [Contributing](#-contributing) • [License](#-license)

---

## Table of Contents
- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## About
LearnSpace is a task and learning management systembuilt with Node.js, Express, MongoDB, and Vite. It helps you manage your tasks, organize learning materials, and track your progress in one place.

### Why use LearnSpace?
- 📝 Task Management:
- 🔐 Secure Authentication:
- 📱 Modern UI:
- 💾 Persistent Storage:
User Dashboard:
- 🎯 Organized Views:

---

## Features
### User Features

- ✅ User Registration & Authentication:
- ✅ Task Management:
Task Organization:
User Dashboard:
Profile Management:
Session Management:

### Security Features

- 🔒 Password Hashing:
JWT Authentication:
Input Validation:
Error Handling:

---

## Tech Stack
### Frontend

- Vite
HTML5
CSS3
Vanilla JavaScript
PostCSS

### Backend

- Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
dotenv

### Development Tools

- Git
npm
EJS

---

## Project Structure
```
LearnSpace/
│
├── client/                 # Frontend application
│   ├── public/            # Static assets
│   ├── src/               # Source files
│   ├── vite.config.js     # Vite configuration
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── postcss.config.mjs # PostCSS configuration
│
├── config/                # Configuration files
│   └── db.js             # MongoDB connection setup
│
├── models/               # Mongoose schemas
│   ├── Task.js          # Task model schema
│   └── user-model.js    # User model schema
│
├── routes/              # API route handlers
│   ├── task-routes.js   # Task CRUD routes
│   └── user-routes.js   # User authentication routes
│
├── views/               # EJS template files
│   ├── register.ejs     # User registration page
│   ├── login.ejs        # User login page
│   └── index.ejs        # Dashboard/home page
│
├── .gitignore           # Git ignore rules
├── package.json         # Backend dependencies
├── .env                 # Environment variables
├── app.js               # Express application setup
├── server.js            # Server entry point
└── README.md            # Project documentation
```

---

## Installation
### Prerequisites

Ensure you have the following installed:

- Node.js
npm
MongoDB
Git

### Clone the Repository

```bash
git clone https://github.com/HimanshiSh03/LearnSpace.git
cd LearnSpace
```

### Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Create Environment File

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables to `.env`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/learnspace
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/learnspace

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# Frontend URL
CLIENT_URL=http://localhost:5173

# Session Configuration
SESSION_SECRET=your_session_secret_key
```

### Start the Application

#### Development Mode

**Terminal 1 - Backend**:
```bash
npm run dev
# Backend runs on http://localhost:3000
```

**Terminal 2 - Frontend**:
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

#### Production Build

```bash
# Build frontend
cd client
npm run build

# Start backend (serves frontend)
cd ..
npm start
```

---

## ⚙️ Configuration

### MongoDB Setup

#### Local MongoDB

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Ubuntu/Linux
sudo systemctl start mongod

# Windows - MongoDB runs as a Windows Service automatically
```

#### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

---

## 📖 Usage

### For Users

#### 1. Registration
- Navigate to `/register`
- Fill in username, email, and password
- Click "Create Account"
- Automatically redirected to login

#### 2. Login
- Navigate to `/login`
- Enter email and password
- Click "Login"
- Redirected to dashboard

#### 3. Task Management
- **Create Task**: Click "New Task" button
- **View Tasks**: All tasks displayed on dashboard
- **Edit Task**: Click on task to edit details
- **Delete Task**: Click delete button to remove task
- **Change Status**: Update task status (todo, in-progress, completed)

---

## 🔌 API Endpoints

### Authentication Routes

#### Register New User
```http
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Task Routes

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer {token}
```

#### Create New Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete Project",
  "description": "Finish the LearnSpace project",
  "priority": "high",
  "dueDate": "2025-12-31"
}
```

#### Update Task
```http
PUT /api/tasks/:taskId
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:taskId
Authorization: Bearer {token}
```

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Task Schema
```javascript
{
  _id: ObjectId,
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['todo', 'in-progress', 'completed'] },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
**Error**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:
- Ensure MongoDB is running
- Check if port 27017 is available
- Verify `MONGO_URI` in `.env` file

### Port Already in Use
**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using port
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=3001
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes** and commit: `git commit -am 'Add new feature'`
4. **Push to branch**: `git push origin feature/your-feature`
5. **Submit a Pull Request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## Contact
HimanshiSh03
- GitHub: [@HimanshiSh03](https://github.com/HimanshiSh03)
- Issues: [Report a bug or request a feature](https://github.com/HimanshiSh03/LearnSpace/issues)

---

## Acknowledgments
### Built With

- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [EJS](https://ejs.co/) - Template engine

---

### Star this repository if you found it helpful!
Made with ❤️ by HimanshiSh03
[Back to Top](#learnspace-)
