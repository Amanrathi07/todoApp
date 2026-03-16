import { Router } from "express" ;
import { getToken } from "../middleware/auth.middleware";
import { prismaClient } from "../lib/prisma";

const router = Router() ;

router.post("/todo",getToken,(req,res)=>{
    
    const {title , description , completed ,createdAt ,updatedAt} = req.body

    const newTodo = prismaClient.todo.create({
        data:{
            title ,
            description ,
            completed ,
            userId :req.userId,
            createdAt ,
            updatedAt ,
        }
    })    
    
    if(!newTodo){
        return res.status(400).json({
            message:"error while making new entri in db"
        })
    }

    return res.status(201).json({
        message:"added new todo in the db"
    })
})

export default router ;