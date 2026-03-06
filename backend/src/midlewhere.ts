import { basicAuth } from 'hono/basic-auth'
import { app } from '.'

// ...

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})