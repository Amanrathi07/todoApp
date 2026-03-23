import jwt from "jsonwebtoken"
import type { NextFunction, Request, Response } from "express";

export interface NewRequest extends Request{
    userId? : string | jwt.JwtPayload
}

export function getTokenFromReq(req:NewRequest,res:Response,next:NextFunction){

    const token= req.cookies ;

    console.log("token i get from req :",token)
    const Id = jwt.verify(token.todoCookie,process.env.SECRET!)
    
    req.userId = Id ;
    next()
}
