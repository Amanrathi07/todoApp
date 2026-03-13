import { AddFriendForm } from "./components/AddFriendForm";
import ShowData from "./components/ShowData";

export default function App() {
  return (
    <div className="h-dvh flex flex-col gap-10 items-center justify-center">
      <ShowData />
      <AddFriendForm />
    </div>
  )
}
