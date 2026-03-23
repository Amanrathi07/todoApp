import { Route, Routes } from "react-router-dom";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";
import Signup from "./modules/Signup";
import Todos from "./modules/Todos";
import Signin from "./modules/Signin";
import Navbar from "./modules/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";


export default function App() {
  const [online,setOnline]=useState<boolean>(false);

  async function healthCheck(){
    try {
      const res = await axios.get("http://localhost:3000/") ;
      console.log(res.data)
      setOnline(res.data.online)
    } catch (error) {
      console.log(error)
      setOnline(false)
    }
  }

  useEffect(()=>{
    const checkInterval = setInterval(() => {
      healthCheck()
    }, 5000);

    return()=>{
      clearInterval(checkInterval)
    }
  },[])

  const unSyncTodos = useLiveQuery(async () => {
    return await db.todos
      .where("status")
      .anyOf(["unsynced", "deleted"])
      .toArray();
  });

  let status = "loading...";
  if (unSyncTodos) {
    status = unSyncTodos.length > 0 ? "unsynced" : "synced";
  }


   
  return (
    <Routes>
        <Route path={"/"} element={<Navbar online={online}/>}>
        <Route path="/" element={ <Todos  status={status}/> } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        </Route>

    </Routes>
  );
}



