import { useState, useTransition } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { refetchTodos } from "../functions/refetchTodos";
import { axiosInstance } from "../lib/axiosInstance";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";

export default function Signup() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const router = useNavigate();
  const { setAuth } = useAuth();

  async function handelForm(e:any) {
    e.preventDefault()
    if (!data.name || !data.email || !data.password) {
      return;
    }
    startTransition(async () => {
      try {
        const responce = await axiosInstance.post("/auth/signup", data);

        localStorage.setItem("todoAuth", JSON.stringify(responce.data.auth));
       
        setAuth(responce.data.auth);
        toast.success(responce.data.message);
        refetchTodos();
        router("/");
      } catch (error: any) {
        toast(error.response?.data?.message || "Something went wrong");
      }
    });
  }

    async function handelGoogle() {
      try {
        const result = await signInWithPopup(auth,provider) ;
        const token = await result.user.getIdToken()
        const responce = await axiosInstance.post("/auth/googleAuth",{
          token 
        });
        
          localStorage.setItem("todoAuth", JSON.stringify(responce.data.auth));
          setAuth(responce.data.auth);
  
          toast.success(responce.data.message);
          refetchTodos();
          router("/");
  
      } catch (error:any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <form >

        
        <div className="mb-6 space-y-1">
          <h1 className="text-lg font-medium text-zinc-900">Sign up</h1>
          <p className="text-sm text-zinc-500">
            Create an account to get started
          </p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="h-10 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400"
          />

          <Input
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="h-10 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400"
          />

          <Input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="h-10 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400"
          />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          onClick={(e)=>handelForm(e)}
          className="mt-6 h-10 w-full bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-900 disabled:opacity-60"
        >
          {isPending ? "Signing up..." : "Sign up"}
        </Button>
      
        </form>
        <br />
        <Button onClick={handelGoogle} className="w-full">google</Button>
      </div>
    </div>
  );
}