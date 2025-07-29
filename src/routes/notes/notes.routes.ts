import { createRoute, z } from '@hono/zod-openapi'

export const notes = createRoute({
    tags: ['Notes'],
    path: '/get-notes',
    method: 'get',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.string(),
          },
        },
        description: 'get notes',
      },

    }}
)
export const notesPost = createRoute({
    tags: ['Notes'],
    path: '/post-notes',
    method: 'post',
    body: z.object({
        key: z.string(),
      }),
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.string(),
          },
        },
        description: 'get notes',
      },

    },
  }
)

export type notesRoutes = typeof notes
export type notesPostRoutes = typeof notesPost