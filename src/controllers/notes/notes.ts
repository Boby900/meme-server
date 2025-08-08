import { RouteHandler } from "@hono/zod-openapi"
import type { Bindings } from "../../types"
import { notesRoutes, notesPostRoutes, writeKVRoute, readKVRoute, deleteKVRoute } from "../../routes/notes/notes.routes"

export const notesHandler: RouteHandler<notesRoutes, { Bindings: Bindings }> = async (c) => {
    return c.json(
        'getting notes',
    )
}
export const notesPostHandler: RouteHandler<notesPostRoutes, { Bindings: Bindings }> = async (c) => {

    try {
        const body = c.req.valid('json')
        const name = body.name
        const email = body.email
        const key = body.key
        return c.json({
            message: `wrote ${name} to ${email} with key ${key} successfully!`
            //   status: 200,
        }, 200)



    } catch (error) {
        console.error('Error writing to KV:', error)
        return c.json({
            error: 'Failed to write to KV',
        }, 400)

    }

}


export const writeNotesToKV: RouteHandler<writeKVRoute, { Bindings: Bindings }> = async (c) => {
    const body = c.req.valid('json')

    await c.env.KV.put('test', JSON.stringify(body))

    return c.json({
        message: `Successfully wrote to key 'test'`,
        data: body
    })
}

export const readNotesFromKV: RouteHandler<readKVRoute, { Bindings: Bindings }> = async (c) => {
    const key = 'test'

    const value = await c.env.KV.get(key)
    if (!value) {
        return c.json("Key not found", 404)
    }
    return c.json(`Key  found ${value}`, 200)
}

export const deleteNotesFromKV: RouteHandler<deleteKVRoute, { Bindings: Bindings }> = async (c) => {
    const key = c.req.param('key')
    console.log(key)
    const value = await c.env.KV.get(key)
    if (!value) {
        return c.json("Key not found", 404)
    }
    const deleted = await c.env.KV.delete(key)
    console.log(deleted)
    return c.json(`Key  found ${value} deleted ${deleted}`, 200)
}