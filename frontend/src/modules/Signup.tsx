import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useNavigation } from "react-router-dom";


export default function Signup() {

    const [data,SetData] = useState({name:"",email:"",password:""}) ;

    const router = useNavigate()

    async function handelForm(){
        
       try {
         const responce  = await axios.post("http://localhost:3000/v1/auth/signup",data,{
            withCredentials:true
        })

        console.log(responce)

        toast.success(responce.data.message)
        router("/")
       } catch (error) {
            console.log(error)
       }
        
    }

  return (
    <div className="flex h-dvh items-center justify-center ">
       <div className="flex flex-col gap-3 p-8 bg-zinc-200/50 rounded-2xl">
         <Input placeholder="name" onChange={(e)=> SetData({...data,name:e.target.value})}/>

         <Input placeholder="email" onChange={(e)=> SetData({...data,email:e.target.value})}/>

         <Input placeholder="password" onChange={(e)=> SetData({...data,password:e.target.value})}/>

         <Button type="submit" onClick={handelForm}>signup</Button>
       </div>
    </div>
  )
}
