import { db } from "../db";

export  function handelLogout(setAuth:()=>void){
        localStorage.removeItem("todoAuth") ,
        
        document.cookie = "todoCookie" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setAuth(null)
        db.todos.clear()
    }