import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();



app.use(logger())

const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}


app.get("/", (c) => {
    return c.json({
        message:"working"
    })
});

app.get('/page', (c) => {
  return c.html(<View />)
})

export default app;

