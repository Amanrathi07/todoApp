# 📝 TodoApp — Offline-First Task Manager

A full-stack todo application built with an **offline-first architecture** and **incremental polling sync**. All operations work locally without internet, and data synchronizes automatically when connectivity is restored.

---

## 🗂️ Project Structure

todo/ 
├── frontend/  
 # React + TypeScript  client (IndexedDB via Dexie) 
└── backend/  
 # Bun + Node.js + Express REST API

---

## ✨ Features

- ✅ Full CRUD — works entirely offline
- 🔄 Incremental polling sync — safe updates without data loss
- 📡 Connection awareness — UI reflects internet and server status
- 🛠️ Manual **Force Sync** and **Refetch** controls
- 🔐 Auth-gated sync — runs only when user is authenticated
- ⚖️ Last Write Wins (LWW) conflict resolution via `updatedAt` timestamps
- 🗑️ Soft deletes on backend with delta-based sync

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

All operations (create, update, delete) happen **locally first** via IndexedDB. The backend is treated as a sync target.

Each todo has a `status` field:
- `"unsynced"` — modified locally, not yet pushed
- `"synced"` — confirmed on backend
- `"deleted"` — deleted locally after syncing to backend

### Incremental Polling Sync

- **Frontend**: Push local unsynced changes → send `lastSyncedAt` → fetch only backend changes since last sync  
- **Backend**: Compare `lastSyncedAt` with `updatedAt` of records → return only new/updated rows  
- **Safe Refetch**: If dataset changed significantly, replace local state in a transaction to prevent data loss

Client → IndexedDB (unsynced) ↓ Push local changes → backend ↓ Send lastSyncedAt → backend ↓ Receive changes → update local DB

### Key Benefits
- Reduces unnecessary data transfer
- Guarantees no data loss during sync
- Avoids overwriting unsynced local changes
- Efficient for large datasets

---

## 🧠 Conflict Resolution

Uses **Last Write Wins (LWW)** based on `updatedAt` timestamps. Simple and effective for single or small-team usage.

---

## 🗑️ Delete Handling

Deletes are **soft-deleted on the backend**. Soft-deleted items are excluded from responses. On refetch, the client replaces its local state, naturally removing deleted items.

---

## 🧰 Manual Controls

| Control | Description |
|---------|-------------|
| **Force Sync** | Immediately pushes all unsynced local changes to backend |
| **Refetch** | Pulls latest state from backend and overwrites local DB if needed |

---

## 🚀 Getting Started

### Prerequisites
- Bun 1.0+
- Node.js 18+ (optional, for non-Bun scripts)
- Running PostgreSQL instance (or configured DB)

### Backend

```bash
cd todo/backend
bun install
# Configure your .env (DB connection, JWT secret, etc.)
bun dev
```
Frontend
```bash
cd todo/frontend
bun install
bun run dev
```

---

🔮 Planned Improvements

Event-driven sync via WebSockets or SSE for real-time updates

Sync queue states: pending → syncing → failed → retrying

Retry logic with exponential backoff

Batch multiple updates into single requests

Improved conflict resolution (e.g., delete always wins over edit)


---
