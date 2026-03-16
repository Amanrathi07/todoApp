import { Router } from "express" ;
import { getToken } from "../middleware/auth.middleware";

const router = Router() ;

router.post("/todo",getToken,(req,res)=>{
    
    
    res.json({
        message:"working",
        id : req.userId
    })
})

export default router ;