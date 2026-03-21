import axios from "axios";
import React, { createContext, useEffect, type Dispatch, type SetStateAction } from "react"


type AuthContextType = {
  auth: {id:string ,name:string , email:string } | null;
  setAuth: Dispatch<SetStateAction<{ id: string; name: string; email: string; } | null>>
};

export const AuthContext = createContext<AuthContextType | null >(null);
 
import { useState } from "react";



export default function AuthProvider({children}:{children:React.ReactNode;}) {
    const[auth,setAuth] = useState<{id:string ,name:string , email:string } | null>(null) ;

    async function checkAuth() {
       const responce = await axios.get("http://localhost:3000/v1/auth/me",{withCredentials:true}) ;



       if(!responce.data){
        return 
       }
       setAuth(responce.data)
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
