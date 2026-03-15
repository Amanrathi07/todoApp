import  express  from "express"
import dotenv from "dotenv"

const app = express() ;

app.use(express.json())

dotenv.config()

app.get("/",(req,res)=>{
    res.send("working")
})


app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000/")
})