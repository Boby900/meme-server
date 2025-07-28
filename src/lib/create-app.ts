import type { Bindings } from "@/types"
import { logger } from 'hono/logger'

import { OpenAPIHono } from '@hono/zod-openapi'


export default function createApp() {
    const app = new OpenAPIHono<{ Bindings: Bindings }>()
    app.use(logger())
    return app
}