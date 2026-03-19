import axios from "axios";
import { Button } from "../components/ui/button";
import { db, type TodoType } from "../db";
import { AddFriendForm } from "./AddFriendForm";
import ShowData from "./ShowData";

interface TodoProps extends TodoType{
    userId:string
}

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

    async function refetchTodos() {
        const dbResponce = await axios.get("http://localhost:3000/v1/todos/todos",{withCredentials:true}) ;

        if(dbResponce.data.todos){

            await db.todos.clear()

            dbResponce.data.todos.map(async(todo:TodoProps)=>{
            await db.todos.add({
                title:todo.title,
                description:todo.description,
                completed:todo.completed ,
                createdAt:todo.createdAt,
                updatedAt:todo.updatedAt,
                dbId:todo.userId as string,
                status:"synced"
            })
        })
        }


    }
  return (
    <div className="h-dvh flex flex-col gap-10 items-center justify-center">
          <div className="flex gap-4">
            <Button onClick={sendTodos}>{status}</Button>
            <Button onClick={refetchTodos}>refetch</Button>
          </div>
          <ShowData />
          <AddFriendForm />
    </div>
  )
}
