// db.ts
import { Dexie, type EntityTable } from "dexie"

interface Friend {
  id: number
  title: string
  description: string
}

const db = new Dexie("todo_table") as Dexie & {
  todos: EntityTable<
    Friend,
    "id" // primary key "id" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  todos: "++id, title, description", // primary key "id" (for the runtime!)
})

export type { Friend }
export { db }
