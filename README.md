
# 📝 TodoApp — Offline-First Task Manager

A full-stack todo application built with an **offline-first architecture** and **event-driven sync**. All operations work locally without internet or backend availability, and data synchronizes automatically when connectivity is restored.

---

## 🗂️ Project Structure

```
todo/
├── frontend/       # React + TypeScript client (IndexedDB via Dexie)
└── backend/        # Bun + Node.js + Express REST API
```

---

## ✨ Features

- ✅ Full CRUD — works entirely offline
<<<<<<< HEAD
- 🔄 Auto-sync when internet  available

- 🔁 Background polling pull remote updates
=======
- 🔄 Auto-sync when internet and backend are available
- 📡 Connection awareness — UI reflects internet and server status
- 🔁 Event-driven sync with minimal polling
>>>>>>> 04abdf9 (update readme.md)
- 🛠️ Manual **Force Sync** and **Refetch** controls
- 🔐 Auth-gated sync — runs only when user is authenticated
- ⚖️ Last Write Wins (LWW) conflict resolution via `updatedAt` timestamps
- 🗑️ Soft deletes on the backend with delta-based sync

---

## 🧱 Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React + TypeScript | UI framework |
| Dexie (IndexedDB) | Local-first database |
| localStorage | Stores `lastSyncedAt` timestamp for incremental sync |

### Backend
| Tool | Purpose |
|------|---------|
| Bun + Node.js + Express | REST API runtime |
| PostgreSQL / Central DB | Persistent storage |
| Soft deletes | Safe deletion with sync support |

---

## ⚡ How Offline-First Works

All operations (create, update, delete) happen **locally first** via IndexedDB. The backend is treated as a sync target, not the runtime source of truth.

Each todo has a `status` field:
- `"unsynced"` — modified locally, not yet pushed
- `"synced"` — confirmed on backend
- `"deleted"` — deleted locally if synced to backend
---

<<<<<<< HEAD
## 🔄 Sync System

### Sync Conditions
Sync runs only when **all** of the following are true:
1. Internet connectivity is available
2. User is authenticated

=======
## 🔄 Event-Driven Sync System
>>>>>>> 04abdf9 (update readme.md)

### Sync Flow
- A single **polling request** sends `lastSyncedAt` timestamp to the backend.
- Backend returns **only changes since the last sync**.
- If the backend dataset is too large, a **refetch via transaction** is triggered to prevent data loss.
- Local unsynced changes are always **pushed first** before refetching from backend.

```
<<<<<<< HEAD
User action → IndexedDB (unsynced)
                  ↓
         Background poll (every ~5s)
                  ↓
         Push unsynced → backend(event based by worker)
                  ↓
         Mark as synced locally
```

### On Reconnect
```
Client comes online
        ↓
Send lastSyncedAt (from localStorage)
        ↓
Backend checks for changes since lastSyncedAt
        ↓
If changes exist → force refetch 
        ↓
Client replaces local state with backend state (by tranction so no data lose)
```


=======
Client → IndexedDB (unsynced)
          ↓
Push local changes → backend
          ↓
Send lastSyncedAt → backend
          ↓
Receive changes → update local DB
```

### Key Benefits
- Reduces unnecessary data transfer
- Guarantees no data loss during large backend updates
- Avoids overwriting unsynced local changes
- Scales efficiently for growing databases
>>>>>>> 04abdf9 (update readme.md)

---

## 🧠 Conflict Resolution

Uses **Last Write Wins (LWW)** based on `updatedAt` timestamps.  
Simple and effective for single or small-team usage.

---

## 🗑️ Delete Handling

Deletes are **soft-deleted on the backend**. Soft-deleted items are excluded from responses. On refetch, the client replaces its local state, naturally removing deleted items.

---

## 🧰 Manual Controls

| Control | Description |
|---------|-------------|
| **Force Sync** | Immediately pushes all unsynced local changes to backend |
<<<<<<< HEAD
| **Refetch** | Pulls latest state from backend and overwrites local DB |

---

## 🛡️ Rate Limiting

| Route Type | Rate Limited |
|------------|-------------|
| Auth routes | ✅ Yes |
| Mutation routes (create/update/delete) | ✅ Yes |
| Sync polling | ❌ No — allows burst sync after offline periods |

=======
| **Refetch** | Pulls latest state from backend and overwrites local DB if needed |
>>>>>>> 04abdf9 (update readme.md)

---

## 🚀 Getting Started

### Prerequisites
<<<<<<< HEAD
- Bun
- A running PostgreSQL instance (or your configured DB)
=======
- Bun 1.0+
- Node.js 18+ (optional, for non-Bun scripts)
- Running PostgreSQL instance (or configured DB)
>>>>>>> 04abdf9 (update readme.md)

### Backend

```bash
cd todo/backend
bun install
# Configure your .env (DB connection, JWT secret, etc.)
<<<<<<< HEAD
bun run prisma:dev
bun run dev
=======
bun dev
>>>>>>> 04abdf9 (update readme.md)
```

### Frontend

```bash
cd todo/frontend
bun install
bun run dev
```

---

## 🔮 Planned Improvements

- [ ] Event-driven sync via WebSockets or SSE for real-time updates
- [ ] Sync queue states: `pending → syncing → failed → retrying`
- [ ] Retry logic with exponential backoff
- [ ] Batch multiple updates into single requests
- [ ] Improved conflict resolution (e.g., delete always wins over edit)