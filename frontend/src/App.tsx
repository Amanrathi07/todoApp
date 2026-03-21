import { Route, Routes } from "react-router-dom";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";
import Signup from "./modules/Signup";
import Todos from "./modules/Todos";
import Signin from "./modules/Signin";
import { useContext } from "react";
import { AuthContext } from "./context/useAuthContext";

export default function App() {
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

  const context = useContext(AuthContext)

  if(!context){
     throw new Error("AuthContext not found");
  }


    const { auth, setAuth } = context;

  return (
    <Routes>
      <Route path="/" element={ <Todos status={status}/> } />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

    </Routes>
  );
}



