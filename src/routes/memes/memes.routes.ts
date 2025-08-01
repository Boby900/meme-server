import { createRoute, z } from '@hono/zod-openapi'

export const memes = createRoute({
    tags: ['Memes'],
    path: '/get-meme',
    method: 'get',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.string(),
          },
        },
        description: 'get meme',
      },

    },
  }
)

export type memesRoutes = typeof memes
