import { db } from "../db";
import type { todoResType } from "../modules/Todos";
import { axiosInstance } from "../lib/axiosInstance";

export async function refetchTodos() {
  const dbResponce = await axiosInstance.get("/todos/todos");

  if (dbResponce.data.todos) {
    await db.transaction("rw", db.todos, async () => {
      await db.todos.clear();
      await Promise.all(
        dbResponce.data.todos.map(async (todo: todoResType) => {
          await db.todos.add({
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
            dbId: todo.id,
            status: "synced",
          });
        }),
      );
    });

    localStorage.setItem("todoLastSync", JSON.stringify(new Date()));
  }
}
