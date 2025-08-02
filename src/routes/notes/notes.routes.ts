import { createRoute, z } from '@hono/zod-openapi'
// Define the authorization header schema
const authHeaderSchema = z.object({
  authorization: z.string().describe('Basic authentication header (e.g., "Basic base64encodedcredentials" of username and password )')
})
export const notes = createRoute({
  tags: ['Notes'],
  path: '/notes',
  method: 'get',
  request: {
    headers: authHeaderSchema
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.string(),
        },
      },
      description: 'get notes',
    },

  }
}
)
export const notesPost = createRoute({
  tags: ['Notes'],
  path: '/notes',
  method: 'post',
  request: {
    headers: authHeaderSchema,
    body:
    {
      content: {
        'application/json': {
          schema: z.object({
            key: z.string(),
            name: z.string(),
            email: z.email(),
          }),
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
          }),
        },
      },
      description: 'get notes',
    },
  },

},
)
export const writeKVRoute = createRoute({
  tags: ['Notes'],
  method: "post",
  path: "/kv",
  request: {
    headers: authHeaderSchema,
    body: {
      content: {
        "application/json": {
          schema: z.any() // Accept any JSON data
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.any()
          })
        }
      },
      description: "Successfully wrote to KV"
    }
  }
})

export const readKVRoute = createRoute({
  tags: ['Notes'],
  method: "get",
  path: "/kv",
  request: {
    headers: authHeaderSchema
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.string() // Just a string!
        }
      },
      description: "Raw value from KV store"
    },
    404: {
      content: {
        "application/json": {
          schema: z.string()
        }
      },
      description: "Key not found"
    }
  }
})

export const deleteKVRoute = createRoute({
  tags: ['Notes'],
  method: "delete",
  path: "/kv/{key}",
  request: {
    headers: authHeaderSchema
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.string() // Just a string!
        }
      },
      description: "Raw value from KV store"
    },
    404: {
      content: {
        "application/json": {
          schema: z.string()
        }
      },
      description: "Key not found"
    }
  }
})
export type notesRoutes = typeof notes
export type notesPostRoutes = typeof notesPost

export type writeKVRoute = typeof writeKVRoute
export type readKVRoute = typeof readKVRoute
export type deleteKVRoute = typeof deleteKVRoute
