import { Route, Routes } from "react-router-dom";
import { AddFriendForm } from "./modules/AddFriendForm";
import ShowData from "./modules/ShowData";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";
import Signup from "./modules/Signup";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

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

  return (
    <Routes>
      <Route path="/" element={ <div className="h-dvh flex flex-col gap-10 items-center justify-center">
          {status}
          <ShowData />
          <AddFriendForm />
        </div> } />

        <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}



