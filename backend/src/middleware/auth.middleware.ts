import jwt from "jsonwebtoken"
import type { NextFunction, Request } from "express";



export function getTokenFromReq(req:Request,res:Response,next:NextFunction){

    const token= req.cookies ;
    const Id = jwt.verify(token.todoCookie , process.env.SECRET!)

    req.userId = Id ;
    next()
}

