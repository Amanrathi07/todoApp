import { useState } from "react"
import { db } from "../db"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function AddFriendForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function addFriend() {
    try {
      // Add the new friend!
      await db.todos.add({
        title,
        description,
      })
      setDescription("")
      setTitle("")
    } catch (error) {
    }
  }

  return (
     <>
      <div className="flex gap-6">
        <Input
        placeholder="Title"
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <Input
        placeholder="Description"
        type="text"
        value={description}
        onChange={(ev) => setDescription((ev.target.value))}
      />
      <Button onClick={addFriend}>Add</Button>
      </div>
    </>
  )
}
