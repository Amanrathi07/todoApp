import React, { createContext } from "react"

export const AuthContext = createContext();
 
import { useState } from "react";


export default function AuthProvider({children}:{children:React.ReactNode;}) {
    const[auth,setAuth] = useState() ;
  return (
    <AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}
