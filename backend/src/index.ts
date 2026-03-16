import  express  from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/auth.route";
import cookieParser from "cookie-parser"
import todoRouter from "./routes/todo.route";

const app = express() ;

app.use(cookieParser()) 
app.use(express.json())
app.use(cors({
    // origin: "http://localhost:5173", 
    credentials: true
}))
dotenv.config()

app.get("/",(req,res)=>{
    res.send("working")
})

app.use("/v1/auth",authRoute)

app.use("/v1/todos",todoRouter)

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000/")
})