import axios from "axios";
import { refetchTodos } from "./refetchTodos";
import useAuth from "../hooks/useAuth";

export async function checkChange(auth){

    if(!auth)return
    
    const date = JSON.parse(localStorage.getItem("todoLastSync")) 
    
    if(!date)return

    const responce = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/checkChange`,{time:date},{withCredentials:true});

    if(responce?.data?.change){
        refetchTodos()
    }
}