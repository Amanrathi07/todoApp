# 🧠 Full-Stack Todo App (Offline-Ready)

A modern full-stack Todo application built with a scalable backend and an offline-capable frontend.

This project is not a tutorial-based clone — it was built from scratch with an experimental approach, exploring multiple backend frameworks, databases, and architectural patterns before converging on a clean and scalable solution.

---

## 🚀 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- React Router
- Zod (validation)
- Dexie (IndexedDB for offline storage)

### Backend
- Bun runtime
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL / MySQL (via Prisma)
- JWT Authentication
- Cookie-based auth
- Express Rate Limiting

---

## ✨ Features

- ✅ Create, update, delete todos
- 🔐 Authentication using JWT + cookies
- 📦 Structured backend architecture
- 💾 Local-first storage using IndexedDB
- 🔄 Sync-ready design (local + server state)
- ⚡ Fast development with Bun + Vite

---

## 🧩 Architecture

### Backend
```
src/
├── controller/
├── routes/
├── middleware/
├── lib/
└── index.ts
```

- Separation of concerns (controllers, routes, middleware)
- Scalable and production-ready structure
- Prisma for database abstraction

---

### Frontend
```
src/
├── components/
├── modules/        # feature-based structure
├── hooks/
├── context/
├── functions/
├── db.ts           # IndexedDB (Dexie setup)
```

- Modular architecture (not flat component mess)
- Custom hooks + context for state handling
- Designed for offline-first capabilities

---

## 🔄 Offline-First Approach (Work in Progress)

This app uses **Dexie (IndexedDB)** to store todos locally.

Why this matters:
- Works without internet
- Faster UI (no constant API calls)
- Foundation for future sync engine

Planned:
- Background sync with backend
- Conflict resolution strategy
- Optimistic updates

---

## 🧪 Engineering Decisions

This project was built iteratively by exploring different approaches:

- Evaluated **Hono vs Express** → chose Express for ecosystem and middleware flexibility
- Tested **multiple database options (PostgreSQL, MySQL)** → standardized using Prisma ORM
- Adopted **Bun runtime** for faster development and modern tooling

This process helped in understanding real-world trade-offs instead of blindly following a fixed stack.

---

## ⚙️ Setup

### Clone Repository
```bash
git clone https://github.com/Amanrathi07/todoApp.git
cd todoApp
```

---

### Backend Setup

```bash
cd backend
bun install
```

Create `.env` file:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret

```

Run backend:

```bash
bun run dev
```

---

### Frontend Setup

```bash
cd frontend
bun install
bun run dev
```

---

## 🔗 API (Example)

| Method | Endpoint      | Description        |
|--------|-------------|--------------------|
| GET    | /todos      | Get all todos      |
| POST   | /todos      | Create todo        |
| PUT    | /todos/:id  | Update todo        |
| DELETE | /todos/:id  | Delete todo        |

---

## 🔮 Future Improvements

- 🔄 Full offline sync engine (like Notion)
- ⚡ Optimistic UI updates
- 📱 PWA support
- 🗂️ Filters & categories
- 🌙 Dark mode

---

## ⚠️ Note

Some dependencies (e.g., alternative frameworks or database drivers) were installed during experimentation and may not be part of the final architecture.

---

## 👨‍💻 Author

**Aman Rathi**  
- GitHub: https://github.com/Amanrathi07  
- LinkedIn: https://www.linkedin.com/in/amanrathi83  

---

## 📄 License

MIT License