import { createRoute, z } from '@hono/zod-openapi'
// Define the authorization header schema
import { authHeaderSchema } from '@/lib/authorization-type'

export const createUserRoute = createRoute({
  tags: ['Users'],
  method: "post",
  path: "/user-create",
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
      description: "Successfully created user"
    }
  }
})

export const readUserRoute = createRoute({
  tags: ['Users'],
  method: "get",
  path: "/get-user/{key}",
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
      description: "get user from KV store"
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

export const deleteUserRoute = createRoute({
  tags: ['Users'],
  method: "delete",
  path: "/user/{key}",
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
      description: "Successfully deleted user"
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

export type createUserRoute = typeof createUserRoute
export type readUserRoute = typeof readUserRoute
export type deleteUserRoute = typeof deleteUserRoute
