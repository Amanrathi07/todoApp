import { db } from "../db"
import { useLiveQuery } from "dexie-react-hooks"
import { Button } from "./ui/button"

export default function ShowData() {
    const todos = useLiveQuery(() => db.todos.where("status").anyOf(["synced","unsynced"]).toArray())

    function deleteTodo(id:number , status :"synced"|"unsynced"){
         if(status ==="synced"){
          db.todos.update(id,{status:"deleted"})
         }
         if(status === "unsynced"){
          db.todos.delete(id)
         }
    }
  return (
    <div>
     <ul>
      {todos?.map((todos) => (
    
            <li className="bg-amber-200 p-3" key={todos.id}>
            <p>{todos.title}</p>
            <span className="bg-muted-foreground">{todos.description}</span>
            <p>{todos.status}</p>
            {/* @ts-ignore */}
            <Button onClick={()=>deleteTodo(Number(todos.id), todos.status)} variant={"destructive"}>Delete</Button>
            <Button variant={"link"} onClick={()=>{db.todos.update(todos.id,{status:"synced"})}}>synced</Button>
        </li>
        
      ))}
    </ul>
    </div>
  )
}
