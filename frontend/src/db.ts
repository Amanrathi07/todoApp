// db.ts
import { Dexie, type EntityTable } from "dexie"

interface TodoType {
  id: number
  dbId?:string
  title: string
  description: string
  completed: boolean
  status: "synced" | "unsynced" | "deleted"
  createdAt: Date
  updatedAt: Date
}

const db = new Dexie("todo_table") as Dexie & {
  todos: EntityTable<
    TodoType,
    "id" // primary key "id" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  todos: "++id, title, description ,completed , status , createdAt , updatedAt", // primary key "id" (for the runtime!)
})

export type { TodoType }
export { db }
