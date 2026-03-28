import axios from "axios";
import { Button } from "../components/ui/button";
import { db } from "../db";
import { AddFriendForm } from "./AddFriendForm";
import ShowData from "./ShowData";
import { useEffect } from "react";
import { refetchTodos } from "../functions/refetchTodos";


export interface todoResType{
    title:string ,
    description:string,
    completed:boolean ,
    createdAt:Date,
    updatedAt:Date,
    id:string ,
    status:"synced"
}



export default function Todos({status , online}:{status:string , online:boolean}) {

    useEffect(()=>{
        if(navigator.onLine && status=="unsynced" && online){
            sendTodos()
        }
    },[status,online])


    async function sendTodos(){
        try {
            const todos =await db.todos.where("status").anyOf(["unsynced","deleted","completedChange"]).toArray() ;

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
                if(todo.status=="completedChange"){
                    db.todos.update(todo.id ,{status:"synced"})
                }
                }
            })
            
        } catch (error) {
            
        }
    } 

    
  return (
    <div className="h-dvh flex flex-col gap-10 items-center justify-center">
          <div className="flex gap-4">
            <Button onClick={sendTodos}>{status}</Button>
            <Button onClick={refetchTodos}>refetch</Button>
          </div>
          <AddFriendForm />
          <ShowData />
    </div>
  )
}
