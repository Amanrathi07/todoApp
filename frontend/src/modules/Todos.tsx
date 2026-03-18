import { Button } from "../components/ui/button";
import { AddFriendForm } from "./AddFriendForm";
import ShowData from "./ShowData";

export default function Todos({status}:{status:string}) {
  return (
    <div className="h-dvh flex flex-col gap-10 items-center justify-center">
          <Button>{status}</Button>
          <ShowData />
          <AddFriendForm />
        </div>
  )
}
