# 📝 Todo App

A full-stack Todo application built using modern web technologies.  
It allows users to create, update, delete, and manage tasks efficiently with a clean UI and persistent backend.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## ✨ Features

- ✅ Create new todos
- 📌 Mark todos as completed
- ✏️ Edit existing todos
- ❌ Delete todos
- 🔄 Sync status (if implemented)
- 📱 Responsive UI

---

## 📂 Project Structure

```
todoApp/
│
├── frontend/        # React client
│   ├── src/
│   └── ...
│
├── backend/         # Express server
│   ├── models/
│   ├── routes/
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Amanrathi07/todoApp.git
cd todoApp
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
```

Run backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

---

## 🔗 API Endpoints (example)

| Method | Endpoint        | Description        |
|--------|----------------|--------------------|
| GET    | /todos         | Get all todos      |
| POST   | /todos         | Create todo        |
| PUT    | /todos/:id     | Update todo        |
| DELETE | /todos/:id     | Delete todo        |

---

## 🧠 Future Improvements

- Authentication (JWT)
- Drag & Drop todos
- Offline sync
- Dark mode
- Filters (completed / pending)

---

## 📸 Screenshots

_Add screenshots here_

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aman Rathi**  
- GitHub: https://github.com/Amanrathi07  
- LinkedIn: https://www.linkedin.com/in/amanrathi83  
