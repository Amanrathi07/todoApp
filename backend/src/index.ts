import  express  from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/auth.route";
import cookieParser from "cookie-parser"
import todoRouter from "./routes/todo.route";
import { limiter } from "./middleware/ratelimte";
import { getTokenFromReq, type NewRequest } from "./middleware/auth.middleware";
import { prismaClient } from "./lib/prisma";

dotenv.config()
const app = express() ;
app.set("trust proxy", 1);


app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true
}));

app.use(express.json());

app.use(cookieParser()) ;



app.get("/helthCheck",(req,res)=>{
    return res.status(200).json({
        message:"server is working",
        online:true ,   
    })
})


app.post("/checkChange",getTokenFromReq,async(req:NewRequest,res)=>{
    const {time} = req.body ;
    const lastSync = new Date(time).getTime()
    const dbResponce = await prismaClient.todo.findFirst({
        where:{userId:req.userId as string} ,
        orderBy:{
            updatedAt:"desc"
        }
    }) ;



    if(!dbResponce){
        return res.status(200).json({
            change:false ,
            message:"no response from db"
        })
    }

    console.log(lastSync)
    console.log(dbResponce.updatedAt.getTime())
    
    if(dbResponce.updatedAt.getTime() > lastSync){
        return res.status(200).json({
            change:true ,
            message:"pls refrech the todos"
        })
    }
    

    return res.status(200).json({
        change:false ,
        message:"no need to do anything"
    })
})

app.use("/v1/auth",limiter,authRoute)

app.use("/v1/todos",limiter,todoRouter)

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000/")
})

