import jwt from "jsonwebtoken"
import type { NextFunction, Request } from "express";



export function getToken(req:Request,res:Response,next:NextFunction){
    const token= req.cookies ;
    console.log(token.todoCookie)
    
    const Id = jwt.verify(token.todoCookie , process.env.SECRET!)

    req.userId = Id
    next()
}