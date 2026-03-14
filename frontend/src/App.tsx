import { AddFriendForm } from "./components/AddFriendForm";
import ShowData from "./components/ShowData";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

export default function App() {

  const unSyncTodos = useLiveQuery(async () => {
    return await db.todos.where("status").anyOf(["unsynced","deleted"]).toArray();
  });

  let status = "loading...";
  if (unSyncTodos) {
    status = unSyncTodos.length > 0 ? "unsynced" : "synced";
  }

  return (
    <div className="h-dvh flex flex-col gap-10 items-center justify-center">
      {status}
      <ShowData />
      <AddFriendForm />
    </div>
  );
}