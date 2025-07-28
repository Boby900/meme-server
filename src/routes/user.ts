import { Hono } from 'hono'

const user = new Hono()

user.post('/create', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: 'development',
  })
})

export { user }
