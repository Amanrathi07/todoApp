import { useState } from "react"
import { db } from "../db"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { toast } from "sonner"

interface props {
  setBcSync : ()=>void
}

export function AddTodo() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function addFriend() {
    
    if(title=="" || description == ""){
      return toast.error("title and description can't be empty")
    }
    try {
     
      const date = new Date()

      const data = await db.todos.add({
        title,
        description,
        completed:false ,
        status:"unsynced",
        createdAt:date,
        updatedAt:date
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
