import type { Bindings } from "@/types"
import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception'
import { OpenAPIHono, z } from '@hono/zod-openapi'
import { bearerAuth } from 'hono/bearer-auth'


export default function createApp() {
    const app = new OpenAPIHono<{ Bindings: Bindings }>()
    app.use(logger())
    app.use('/api/*', bearerAuth({
        verifyToken: async (token, c) => {
            return token === c.env.BACKEND_SECRET
        }
    }))

    return app
}