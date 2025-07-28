import { RouteHandler } from "@hono/zod-openapi"
import { memesRoutes } from "./memes.routes"
import type { Bindings } from "../../types"

export const memesHandler: RouteHandler<memesRoutes, { Bindings: Bindings }> = async (c) => {
    return c.json(
        'getting meme',
    )
}


