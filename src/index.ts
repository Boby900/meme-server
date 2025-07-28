import type { Bindings } from './types'
import { OpenAPIHono } from '@hono/zod-openapi'
import { health } from './routes/health'
import { user } from './routes/user'

const app = new OpenAPIHono<{ Bindings: Bindings }>()

app.get('/kv-example', async (c) => {
  const kv = c.env.KV
  // Store a value
  const debugMode = c.env.DEBUG_MODE // "true"
  const apiVersion = c.env.API_VERSION // "v1"
  console.log(kv)
  console.log(debugMode)
  console.log(apiVersion)

  await kv.get('test')
  await kv.put('test', 'bob is here brotherrrrr')

  // Get a value
  const value = await kv.get('test')

  return c.json({ value, debugMode, apiVersion })
})
app.get('/', async (c) => {
  return c.text('hello world')
})

app.route('/health', health)
app.route('/users', user)

export default app
