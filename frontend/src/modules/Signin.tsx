import { useState, useTransition } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { refetchTodos } from "../functions/refetchTodos";
import { axiosInstance } from "../lib/axiosInstance";

export default function Signin() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState({ email: "", password: "" });
  const router = useNavigate();

  const { setAuth } = useAuth();

  async function handelForm(e:any) {
      e.preventDefault() 
    startTransition(async () => {
      if (!data.email || !data.password) {
        return;
      }

      try {
        const responce = await axiosInstance.post("/auth/signin", data);

        localStorage.setItem("todoAuth", JSON.stringify(responce.data.auth));
        setAuth(responce.data.auth);

        toast.success(responce.data.message);
        refetchTodos();
        router("/");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    });
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <form >

        <div className="mb-6 space-y-1">
          <h1 className="text-lg font-medium text-zinc-900">Sign in</h1>
          <p className="text-sm text-zinc-500">
            Enter your credentials to continue
          </p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            className="h-10 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400"
          />

          <Input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            className="h-10 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400"
          />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          onClick={(e)=>handelForm(e)}
          className="mt-6 h-10 w-full bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-900 disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      
        </form>
      </div>
    </div>
  );
}