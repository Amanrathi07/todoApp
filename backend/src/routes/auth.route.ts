import { Router } from "express";

import { getTokenFromReq, type NewRequest } from "../middleware/auth.middleware";
import { handelGoogle, Me, SignIn, SignUP } from "../controller/auth.controller";

const route = Router();

route.post("/signup",SignUP);

route.post("/signin",SignIn);

route.get("/me",getTokenFromReq,Me)

route.post("/googleAuth",handelGoogle)

export default route;