import axios from "axios";
import { Button } from "../components/ui/button";
import { db, type TodoType } from "../db";
import { AddFriendForm } from "./AddFriendForm";
import ShowData from "./ShowData";


// {
//     id: string;
//     title: string;
//     description: string;
//     completed: boolean;
//     createdAt: Date;
//     updatedAt: Date;
//     userId: string;
// }


// interface TodoType {
//   id: number
//   dbId?:string
//   title: string
//   description: string
//   completed: boolean
//   status: "synced" | "unsynced" | "deleted"
//   createdAt: Date
//   updatedAt: Date
// }



export default function Todos({status}:{status:string}) {
    async function sendTodos(){
        try {
            const todos =await db.todos.where("status").anyOf(["unsynced","deleted"]).toArray() ;

            (await todos).map(async(todo)=>{
                const dbRes =await axios.post("http://localhost:3000/v1/todos/todo",todo,{withCredentials:true})

                
                if(dbRes.data){
                    if(todo.status == "unsynced"){
                    console.log("todo id in db  is ",dbRes.data.dbId)
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

            dbResponce.data.todos.map(async(td:any)=>{
            await db.todos.add({
                title:td.title,
                description:td.description,
                completed:td.completed ,
                createdAt:td.createdAt,
                updatedAt:td.updatedAt,
                dbId:td.id ,
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
