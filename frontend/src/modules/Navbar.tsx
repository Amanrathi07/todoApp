import { Link, Outlet } from "react-router-dom";
import { Button, buttonVariants } from "../components/ui/button";
import useAuth from "../hooks/useAuth";
import { handelLogout } from "../functions/logout";

export default function Navbar() {
    const {auth,setAuth} = useAuth()
    if(!auth) null 

  

  return (
    <>
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/70 backdrop-blur-xl mb-4">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
                <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
                    <Link to={"/"}>Todo App</Link>
                </h1>
            </div>
           
            <div className="flex items-center gap-2">
                {
                    auth ?(
                        <Button 
                          onClick={()=>handelLogout(setAuth)} 
                          variant={"destructive"}
                          className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          signOut
                        </Button>
                    ):(
                        <>
                            <Link 
                              className={buttonVariants({
                                  variant:"outline",
                                  className:"bg-white/60 backdrop-blur border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition-all duration-200"
                              })} 
                              to={"/signup"} 
                            >
                              sign-up
                            </Link>

                            <Link 
                              className={buttonVariants({
                                  className:"shadow-sm hover:shadow-md transition-all duration-200"
                              })} 
                              to={"/signin"} 
                            >
                              sign-in
                            </Link>

                        </>
                    )
                }
            </div>
        </div>
    </nav>
    <main className="max-w-6xl mx-auto ">
        <Outlet />
    </main>
    </>
  )
}