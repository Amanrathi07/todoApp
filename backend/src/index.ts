import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();



app.get("/", (c) => {
    return c.json({
        message:"working"
    })
});

export default app;

