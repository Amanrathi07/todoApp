import { startTransition, useState, useTransition } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { refetchTodos } from "../functions/refetchTodos";
import { axiosInstance } from "../lib/axiosInstance";


export default function Signup() {
    const [ispending ,startTransition] = useTransition()
    const [data,setData] = useState({name:"",email:"",password:""}) ;

    const router = useNavigate()

  const {setAuth} =useAuth()

    async function handelForm(){
        
      if(!data.email || !data.email || !data.password){
        return
      }
      startTransition(async()=>{
         try {
         const responce  = await axiosInstance.post("/auth/signup",data)

         localStorage.setItem("todoAuth",JSON.stringify(responce.data.auth))
         setAuth(responce.data.auth)
        toast.success(responce.data.message)
         refetchTodos()
        
        router("/")
       } catch (error:any) {
        toast(error.respone?.data.message)
       }
      })
        
    }

  return (
    <div className="flex h-dvh items-center justify-center ">
       <div className="flex flex-col gap-3 p-8 bg-zinc-200/50 rounded-2xl">
         <Input placeholder="name" onChange={(e)=> setData({...data,name:e.target.value})}/>

         <Input placeholder="email" onChange={(e)=> setData({...data,email:e.target.value})}/>

         <Input placeholder="password" onChange={(e)=> setData({...data,password:e.target.value})}/>

         <Button disabled={ispending} type="submit" onClick={handelForm}>signup</Button>
       </div>
    </div>
  )
}
