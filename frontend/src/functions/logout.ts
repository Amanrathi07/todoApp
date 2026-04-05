import { db } from "../db";

type Prop = React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
} | null>>

export  function handelLogout(setAuth:Prop){
        localStorage.removeItem("todoAuth") ,
        
        document.cookie = "todoCookie" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setAuth(null)
        db.todos.clear()
    }