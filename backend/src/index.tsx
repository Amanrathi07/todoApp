import { Hono } from "hono";
import { logger } from "hono/logger";
import { basicAuth } from 'hono/basic-auth'

 const app = new Hono();



app.use(logger())

app.use(
  basicAuth({
    verifyUser(username, password, c) {
      const name = "aman" 
      const pass = "aman"
     return (
        username === name && password === pass
      )
    },
  })
)



app.get("/", (c) => {
    return c.text("working")
});




export default {
  port : 3001 ,
  fetch: app.fetch
}

