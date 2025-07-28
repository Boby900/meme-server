import { createRoute, z } from '@hono/zod-openapi'
import createApp from '../lib/create-app'

const health = createApp()

health.openapi(
  createRoute({
    path: '/',
    method: 'get',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              status: z.string(),
              timestamp: z.string(),
              environment: z.string(),
              message: z.string().optional(),
            }),

          },
        },
        description: 'health check',
      },

    },
  },

  ),
  (c) => {
    return c.json({
      status: 'okay',
      timestamp: new Date().toISOString(),
      environment: 'development',
    })
  })

health.get('/kv-example', async (c) => {
  const kv = c.env.KV
  const debugMode = c.env.DEBUG_MODE // "true"
  const apiVersion = c.env.API_VERSION // "v1"

  await kv.get('test')
  await kv.put('test', 'bob is here brotherrrrr')

  const value = await kv.get('test')
  return c.json({ value, debugMode, apiVersion })
})

export default health
