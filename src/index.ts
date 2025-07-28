
import { health } from './routes/health'
import user from './routes/user'
import createApp from './lib/create-app'
import { configureOpenApi } from './lib/configure-open-api'

const app = createApp()
configureOpenApi(app)
app.route('/health', health)
app.route('/users', user)
app.get('/', async (c) => {
  return c.text('hello world')
})
app.get('/kv-example', async (c) => {
  const kv = c.env.KV
  const debugMode = c.env.DEBUG_MODE // "true"
  const apiVersion = c.env.API_VERSION // "v1"

  await kv.get('test')
  await kv.put('test', 'bob is here brotherrrrr')

  const value = await kv.get('test')
  return c.json({ value, debugMode, apiVersion })
})
export default app
