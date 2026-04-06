import { db } from "../db";
import { axiosInstance } from "../lib/axiosInstance";


 export async function sendTodos(auth:any):Promise<boolean>{


    if (!auth) {
      return false
    }
    try {
      const todos = await db.todos
        .where("status")
        .anyOf(["unsynced", "deleted", "completedChange"])
        .toArray();

      const results = await Promise.all(todos.map(async (todo) => {
        const dbRes = await axiosInstance.post("/todos/todo", todo);

        if (dbRes.data) {
          if (todo.status == "unsynced") {
            await db.todos.update(todo.id, { status: "synced" ,
                dbId:dbRes.data.dbId
             });
            
          }
          if (todo.status == "deleted") {
            db.todos.delete(todo.id);
          }
          if (todo.status == "completedChange") {
            db.todos.update(todo.id, { status: "synced" });
          }

          
        }
        return true ;
      }))

      const hasFailure = results.some((r) => r === false);

      return !hasFailure;

    } catch (error) {
        console.log("Unexpected error:", error);
        return false;
    }
  }