import { RouteHandler } from "@hono/zod-openapi"
import type { Bindings } from "../../types"
import {createUserRoute, deleteUserRoute,readUserRoute  } from "../../routes/users/users.routes"


export const createUserHandler: RouteHandler<createUserRoute, { Bindings: Bindings }> = async (c) => {
    const body = c.req.valid('json')

    await c.env.KV.put('test', JSON.stringify(body))

    return c.json({
        message: `Successfully wrote to key 'test'`,
        data: body
    })
}

export const readUserHandler: RouteHandler<readUserRoute, { Bindings: Bindings }> = async (c) => {
    const key = 'test'

    const value = await c.env.KV.get(key)
    if (!value) {
        return c.json("Key not found", 404)
    }
    return c.json(`Key  found ${value}`, 200)
}

export const deleteUserHandler: RouteHandler<deleteUserRoute, { Bindings: Bindings }> = async (c) => {
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