import jwt from "jsonwebtoken"

export function jwtGenerate(id:string){
    const myJwt = jwt.sign(id , process.env.SECRET! )
    return myJwt ;
}

