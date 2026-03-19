import { Router } from "express";
import { getTokenFromReq } from "../middleware/auth.middleware";
import { getAlltodos, todoHandeler } from "../controller/todo.controller";

const router = Router();

router.get("/todos",getTokenFromReq,getAlltodos)

router.post("/todo",getTokenFromReq,todoHandeler );

export default router;
