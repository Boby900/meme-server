import { createRoute, z } from '@hono/zod-openapi'

export const getMedia = createRoute({
  tags: ['Media'],
  path: '/get-media',
  method: 'get',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            status: z.string(),
            success: z.boolean(),
          }),
        },
      },
      description: 'get media',
    },
    500: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            status: z.string(),
            success: z.boolean(),
          }),
        },
      },
      description: 'Internal server error',
    },
  },

}


)
export const uploadMedia = createRoute({
  tags: ['Media'],
  path: '/upload-media',
  method: 'post',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.any(),
        },
      },
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            status: z.string(),
            success: z.boolean(),
          }),
        },
      },
      description: 'upload media',
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            status: z.string(),
            success: z.boolean(),
          }),
        },
      },
      description: 'Bad request',
    },
    500: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            status: z.string(),
            success: z.boolean(),
          }),
        },
      },
      description: 'Internal server error',
    },
  },
}
)
export type getMedia = typeof getMedia
export type uploadMedia = typeof uploadMedia
