import { Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
    const responce = useAuth()
    if(!responce.auth) return

    function handelLogout(){
        // localStorage.removeItem("todoAuth") ,
        console.log(document.cookie)
    }
  return (
    <>
    <nav className="border-b-2 p-4 flex justify-between rounded ">
        <div>
            <h1>navbar</h1>
        </div>
        <div className="flex gap-3">
            {
                responce.auth ?(
                    <Button onClick={handelLogout} variant={"destructive"}>signOut</Button>
                ):null
            }
        </div>
    </nav>
    <Outlet />
    </>
  )
}
