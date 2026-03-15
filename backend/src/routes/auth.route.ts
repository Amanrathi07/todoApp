import { Router } from "express";
import { prismaClient } from "../lib/prisma";

const route = Router() ;


route.get("/user",(req,res)=>{
    res.send("user is working")
})

route.post("/signup",(req,res)=>{
    const {name ,email , password} = req.body 
    if(!name ||!email || !password){
        return res.json({
            message:"pls send email and password"
        })
    }

    prismaClient.user.create({
        data:{
            name , email , password
        }
    })
})

export default route ;