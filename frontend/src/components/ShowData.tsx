import { db } from "../db"
import { useLiveQuery } from "dexie-react-hooks"
import { Button } from "./ui/button"

export default function ShowData() {
    const todos = useLiveQuery(() => db.todos.toArray())

    function deleteTodo(id:number){
         db.todos.delete(id)
    }
  return (
    <div>
     <ul>
      {todos?.map((todos) => (
    
            <li className="bg-amber-200 p-3" key={todos.id}>
            <p>{todos.title}</p>
            <span className="bg-muted-foreground">{todos.description}</span>
            <Button onClick={()=>deleteTodo(Number(todos.id))} variant={"destructive"}>Delete</Button>
        </li>
        
      ))}
    </ul>
    </div>
  )
}
