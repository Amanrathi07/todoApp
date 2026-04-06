# 📝 TodoApp — Offline-First Task Manager

A full-stack todo application built with an **offline-first architecture**. All operations work locally without internet or backend availability, and data synchronizes automatically when connectivity is restored.

---

## 🗂️ Project Structure

```
todo/
├── frontend/       # React + TypeScript client (IndexedDB via Dexie)
└── backend/        # Node.js + Express REST API
```

---

## ✨ Features

- ✅ Full CRUD — works entirely offline
- 🔄 Auto-sync when internet  available

- 🔁 Background polling pull remote updates
- 🛠️ Manual **Force Sync** and **Refetch** controls
- 🔐 Auth-gated sync — sync only runs when user is authenticated
- ⚖️ Last Write Wins (LWW) conflict resolution via `updatedAt` timestamps
- 🗑️ Soft deletes on the backend with delta-based sync

---

## 🧱 Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React + TypeScript | UI framework |
| Dexie (IndexedDB) | Local-first database |
| localStorage | Persists `lastSyncedAt` timestamp |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express | REST API |
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

## 🔄 Sync System

### Sync Conditions
Sync runs only when **all** of the following are true:
1. Internet connectivity is available
2. User is authenticated


### Sync Flow
```
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



---

## 🧠 Conflict Resolution

Uses **Last Write Wins (LWW)** based on `updatedAt` timestamps.

Simplicity is prioritized over complex merge logic. Suitable for single or small-team usage.

---

## 🗑️ Delete Handling

Deletes are **soft-deleted on the backend** (row updated, not removed). The backend **excludes soft-deleted items** from all responses. On refetch, the client replaces its local state, naturally removing any items that no longer exist on the backend.

---

## 🧰 Manual Controls

| Control | Description |
|---------|-------------|
| **Force Sync** | Immediately pushes all unsynced local changes to backend |
| **Refetch** | Pulls latest state from backend and overwrites local DB |

---

## 🛡️ Rate Limiting

| Route Type | Rate Limited |
|------------|-------------|
| Auth routes | ✅ Yes |
| Mutation routes (create/update/delete) | ✅ Yes |
| Sync polling | ❌ No — allows burst sync after offline periods |


---

## 🚀 Getting Started

### Prerequisites
- Bun
- A running PostgreSQL instance (or your configured DB)

### Backend

```bash
cd todo/backend
bun install
# Configure your .env (DB connection, JWT secret, etc.)
bun run prisma:dev
bun run dev
```

### Frontend

```bash
cd todo/frontend
bun install
bun run dev
```

---

## ⚠️ Note on Dependencies

During development, several libraries were explored before settling on the current stack (including experiments with SQLite and alternative frameworks). Some of those packages may still be present in `package.json` but are **not actively used**. Safe to ignore — they do not affect runtime behavior.

---

## 🔮 Planned Improvements

- [ ] Sync queue with states: `pending → syncing → failed → retrying`
- [ ] Retry logic with exponential backoff
- [ ] Batch multiple updates into single requests
- [ ] Event-driven sync via WebSockets or SSE
- [ ] Improved conflict resolution (e.g. delete always wins over edit)
