import { RouteHandler } from "@hono/zod-openapi"
import type { Bindings } from "../../types"
import { notesRoutes, notesPostRoutes } from "../../routes/notes/notes.routes"

export const notesHandler: RouteHandler<notesRoutes, { Bindings: Bindings }> = async (c) => {
    return c.json(
        'getting notes',
    )
}
export const notesPostHandler: RouteHandler<notesPostRoutes, { Bindings: Bindings }> = async (c) => {
  
    const key = c.req.param('key')
    await c.env.API_VERSION
    await c.env.KV.put("newKey", 'bob is here')
    return c.json(`Put ${key} successfully!`)
}
