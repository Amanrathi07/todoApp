// import axios from "axios";
import React, { createContext, useEffect, type Dispatch, type SetStateAction } from "react"
import { useState } from "react";


type AuthContextType = {
  auth: {name:string , email:string } | null;
  setAuth: Dispatch<SetStateAction<{  name: string; email: string; } | null>>
};

export const AuthContext = createContext<AuthContextType | null >(null);
 



export default function AuthProvider({children}:{children:React.ReactNode;}) {
    const[auth,setAuth] = useState<{name:string , email:string } | null>(null) ;

    async function checkAuth() {
      //  const responce = await axios.get("http://localhost:3000/v1/auth/me",{withCredentials:true}) ;

      const responce = JSON.parse(localStorage.getItem("todoAuth") as string)


       if(!responce){
        return 
       }
       setAuth(responce)
    }

    useEffect(()=>{
        checkAuth()
    },[])
  return (
    <AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}
