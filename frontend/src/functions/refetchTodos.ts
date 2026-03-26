import axios from "axios";
import { db } from "../db";
import type { todoResType } from "../modules/Todos";


export async function refetchTodos() {
        const dbResponce = await axios.get("http://localhost:3000/v1/todos/todos",{withCredentials:true}) ;

        if(dbResponce.data.todos){

            await db.todos.clear()

            dbResponce.data.todos.map(async(todo:todoResType)=>{
            await db.todos.add({
                title:todo.title,
                description:todo.description,
                completed:todo.completed ,
                createdAt:todo.createdAt,
                updatedAt:todo.updatedAt,
                dbId:todo.id ,
                status:"synced"
            })
        })
        }


    }