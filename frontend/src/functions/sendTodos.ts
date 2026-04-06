import { db } from "../db";
import { axiosInstance } from "../lib/axiosInstance";


 export async function sendTodos():Promise<string | number | boolean>{

   
    try {
      const todos = await db.todos
        .where("status")
        .anyOf(["unsynced", "deleted", "completedChange"])
        .toArray();

      (await todos).map(async (todo) => {
        const dbRes = await axiosInstance.post("/todos/todo", todo);

        if (dbRes.data) {
          if (todo.status == "unsynced") {
            db.todos.update(todo.id, { status: "synced" });
            db.todos.update(todo.id, { dbId: dbRes.data.dbId });
          }
          if (todo.status == "deleted") {
            db.todos.delete(todo.id);
          }
          if (todo.status == "completedChange") {
            db.todos.update(todo.id, { status: "synced" });
          }

          
        }
      });

      return true
    } catch (error) {
        console.log("dont know")
        return false
    }
  }