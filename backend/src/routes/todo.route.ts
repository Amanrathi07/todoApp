import { Router } from "express";
import { getToken } from "../middleware/auth.middleware";
import { prismaClient } from "../lib/prisma";

const router = Router();

router.post("/todo", getToken, async(req, res) => {
  const {dbId, title, description, status, completed, createdAt, updatedAt } =
    req.body;
  if (status == "unsynced") {
    const newTodo =await prismaClient.todo.create({
      data: {
        title,
        description,
        completed,
        userId: req.userId,
        createdAt,
        updatedAt,
      },
    });

    if (!newTodo) {
      return res.status(400).json({
        message: "error while making new entri in db",
      });
    }
    return res.status(201).json({
      dbId:newTodo.id ,
      message: "added new todo in the db",
    });
  }

  if (status == "deleted") {
    const dbmessage =await prismaClient.todo.delete({
        where:{
            id:dbId
        }
    })
     if (!dbmessage) {
      return res.status(400).json({
        message: "error while making new entri in db",
      });
    }
    return res.status(201).json({
      message: "added new todo in the db",
    });

  }

    return res.status(200).json({
        message:"what the fuck !!!!"
    })
});

export default router;
