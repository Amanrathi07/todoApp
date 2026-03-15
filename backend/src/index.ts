import  express  from "express"
import dotenv from "dotenv"

import authRoute from "./routes/auth.route";
const app = express() ;

app.use(express.json())

dotenv.config()

app.get("/",(req,res)=>{
    res.send("working")
})

app.use("/v1/auth",authRoute)

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000/")
})