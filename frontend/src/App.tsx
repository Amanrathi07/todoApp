import { useEffect } from "react";
import { AddFriendForm } from "./components/AddFriendForm";
import ShowData from "./components/ShowData";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

export default function App() {

   const todos = useLiveQuery(() => db.todos.toArray())
    const status = todos?.filter(todo => todo.status="unsynced")
    console.log("status is ",status[0].status)
  
  return (
    <div className="h-dvh flex flex-col gap-10 items-center justify-center">
      {/* {bcSync?(<>
        <p>"data is not sync , click to sync the data"</p>
        <Button>Sync</Button>
      </>):"data is synced"} */}
      <ShowData />
      <AddFriendForm />
    </div>
  )
}
