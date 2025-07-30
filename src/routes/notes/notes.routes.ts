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
    request:{
      body:
      {
        content:{
          'application/json':{
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
