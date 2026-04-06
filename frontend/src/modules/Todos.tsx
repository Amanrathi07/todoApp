import { Button } from "../components/ui/button";
import { db } from "../db";
import { AddTodo } from "./AddTodo";
import ShowData from "./ShowData";
import { useEffect } from "react";
import { refetchTodos } from "../functions/refetchTodos";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { axiosInstance } from "../lib/axiosInstance";
import { checkChange } from "../functions/checkChange";


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


  
    const {auth} = useAuth();
    const worker = new Worker( new URL("../worker/sync.worker.ts",import.meta.url),{type:"module"})
    useEffect(()=>{
        if(navigator.onLine && status=="unsynced" && online){
            worker.postMessage({message:"unsync"})
        }
        document.addEventListener("online",()=>{
            worker.postMessage({message:"unsync"})
        })
    },[status,online])

    useEffect(()=>{
        let checkInterval:null|number = null ;
       
        if(!!auth){
            checkInterval = setInterval(() => {
            checkChange()
        }, 5000);
        }

       return()=>{
       if(checkInterval){
        clearInterval(checkInterval)
       }

       }
    },[auth])
    async function sendTodos(){
        if(!auth){
            return toast.error("login required")
        }
        try {
            const todos =await db.todos.where("status").anyOf(["unsynced","deleted","completedChange"]).toArray() ;

            (await todos).map(async(todo)=>{
                const dbRes =await axiosInstance.post("/todos/todo",todo)

                
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
    <div className=" flex flex-col gap-10 items-center justify-center">
          <div className="flex gap-4">
            <Button onClick={sendTodos}>{status}</Button>
            <Button onClick={refetchTodos}>refetch</Button>
          </div>
          <AddTodo />
          <ShowData />
    </div>
  )
}
