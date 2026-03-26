import { Button } from "../components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { db } from "../db"
import { useLiveQuery } from "dexie-react-hooks"

export default function ShowData() {
  const todos = useLiveQuery(() =>
    db.todos.where("status").anyOf(["synced", "unsynced"]).toArray()
  )

  function deleteTodo(id: number, status: "synced" | "unsynced") {
    if (status === "synced") {
      db.todos.update(id, { status: "deleted" })
    } else {
      db.todos.delete(id)
    }
  }

  if (!todos) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 ">
      {todos.map((todo) => (
        <Card key={todo.id}>
          <CardHeader className="gap-4">
            <CardTitle>{todo.title}</CardTitle>
            <CardDescription>{todo.description}</CardDescription>


            <div className="flex justify-between">
              <Button
              variant="default"
              className="bg-green-500"
              
            >
              completed
            </Button>
              <Button
              variant="destructive"
              //@ts-ignore
              onClick={() => deleteTodo(Number(todo.id), todo.status)}
            >
              Delete
            </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}