import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { refetchTodos } from "../functions/refetchTodos";


export default function Signup() {

    const [data,setData] = useState({name:"",email:"",password:""}) ;

    const router = useNavigate()

  const {setAuth} =useAuth()

    async function handelForm(){
        
       try {
         const responce  = await axios.post("http://localhost:3000/v1/auth/signup",data,{
            withCredentials:true
        })

         localStorage.setItem("todoAuth",JSON.stringify(responce.data.auth))
         setAuth(responce.data.auth)
        toast.success(responce.data.message)
         refetchTodos()
        
        router("/")
       } catch (error) {
            console.log(error)
       }
        
    }

  return (
    <div className="flex h-dvh items-center justify-center ">
       <div className="flex flex-col gap-3 p-8 bg-zinc-200/50 rounded-2xl">
         <Input placeholder="name" onChange={(e)=> setData({...data,name:e.target.value})}/>

         <Input placeholder="email" onChange={(e)=> setData({...data,email:e.target.value})}/>

         <Input placeholder="password" onChange={(e)=> setData({...data,password:e.target.value})}/>

         <Button type="submit" onClick={handelForm}>signup</Button>
       </div>
    </div>
  )
}
