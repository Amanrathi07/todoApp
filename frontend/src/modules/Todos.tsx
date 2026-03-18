import axios from "axios";
import { Button } from "../components/ui/button";
import { db } from "../db";
import { AddFriendForm } from "./AddFriendForm";
import ShowData from "./ShowData";

export default function Todos({status}:{status:string}) {
    async function sendTodos(){
        try {
            const todos =await db.todos.where("status").anyOf(["unsynced","deleted"]).toArray() ;

            (await todos).map(async(todo)=>{
                const dbRes =await axios.post("http://localhost:3000/v1/todos/todo",todo,{withCredentials:true})

                if(dbRes.data){
                    if(todo.status == "unsynced"){
                    db.todos.update(todo.id ,{status:"synced"})
                    db.todos.update(todo.id ,{dbId:dbRes.data.dbId})
                }
                if(todo.status == "deleted"){
                    db.todos.delete(todo.id )
                }
                }
            })
            
        } catch (error) {
            
        }
    } 
  return (
    <div className="h-dvh flex flex-col gap-10 items-center justify-center">
          <Button onClick={sendTodos}>{status}</Button>
          <ShowData />
          <AddFriendForm />
        </div>
  )
}
