import type { Bindings } from "@/types"
import { OpenAPIHono } from "@hono/zod-openapi"
import { version } from "../../package.json"
import { Scalar } from "@scalar/hono-api-reference"
export const configureOpenApi = (app: OpenAPIHono<{ Bindings: Bindings }>) => {
    app.doc('/docs',{
        openapi: '3.1.0',
        info:{
            title:'Meme Server',    
            version: version,
            description:'Meme Server API',
        }
    })

    app.get('/scalar', Scalar({ url: '/docs' , theme: "kepler"}))
}   