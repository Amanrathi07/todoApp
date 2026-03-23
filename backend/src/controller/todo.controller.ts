import type { Response, Request } from "express";
import { prismaClient } from "../lib/prisma";
import type { NewRequest } from "../middleware/auth.middleware";

export const todoHandeler = async(req:NewRequest, res:Response) => {
  
 try {
   const {dbId, title, description, status, completed, createdAt, updatedAt } =
    req.body;



  if (status == "unsynced") {
    const newTodo =await prismaClient.todo.create({
      data: {
        title,
        description,
        completed,
        userId: req.userId as string,
        createdAt,
        updatedAt,
      },
    });


    if (!newTodo) {
      return res.status(400).json({
        message: "error while making new entri in db",
      });
    }
    return res.status(201).json({
      dbId:newTodo.id ,
      message: "added new todo in the db",
    });
  }
  
   if (status == "deleted") {
    const dbmessage =await prismaClient.todo.delete({
        where:{
            id:dbId as string ,
        }
    })
    
     if (!dbmessage) {
      return res.status(400).json({
        message: "error while making new entri in db",
      });
    }
    return res.status(201).json({
      message: "added new todo in the db",
    });

  }

    return res.status(200).json({
        message:"what the fuck !!!!"
    })

 } catch (error) {
    console.log("error in the todoHandeler function ") ;
    return res.status(400).json({
      message:"internal server error "
    })
 }
}

export const getAlltodos= async(req:NewRequest ,res:Response)=>{
    try {
      const dbResponce = await prismaClient.todo.findMany({
        where:{
          userId:req.userId as string 
        }
      })

      if(!dbResponce){
        return res.status(402).json({
          message:"somthing somthing"
        })
      }

      return res.status(200).json({
        todos : dbResponce
      })

    } catch (error) {
      console.log("error in the getAlltodos function")
      return res.status(400).json({
        message:"internal server error"
      })
    }
}