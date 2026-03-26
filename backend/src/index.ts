import  express  from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/auth.route";
import cookieParser from "cookie-parser"
import todoRouter from "./routes/todo.route";
import { limiter } from "./middleware/ratelimte";

dotenv.config()
const app = express() ;
app.set("trust proxy", 1);

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));

app.use(express.json());

app.use(cookieParser()) ;



app.get("/helthCheck",(req,res)=>{
    return res.status(200).json({
        message:"working",
        online:true ,   
    })
})

app.use("/v1/auth",limiter,authRoute)

app.use("/v1/todos",limiter,todoRouter)

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000/")
})

