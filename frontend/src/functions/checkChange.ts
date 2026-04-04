import axios from "axios";
import { refetchTodos } from "./refetchTodos";

export async function checkChange(){

    
    const date = JSON.parse(localStorage.getItem("todoLastSync")as string) 
    
    if(!date)return

    const responce = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/checkChange`,{time:date},{withCredentials:true});

    if(responce?.data?.change){
        refetchTodos()
    }
}