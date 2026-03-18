import { Router } from "express";
import { getTokenFromReq } from "../middleware/auth.middleware";
import { todoHandeler } from "../controller/todo.controller";

const router = Router();

router.post("/todo",getTokenFromReq,todoHandeler );

export default router;
