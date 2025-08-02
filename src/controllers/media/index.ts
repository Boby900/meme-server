import { RouteHandler } from "@hono/zod-openapi"
import type { Bindings } from "../../types"
import { getMedia, uploadMedia } from "@/routes/media/media.routes"
export const getMediaHandler: RouteHandler<getMedia, { Bindings: Bindings }> = async (c) => {
    const media = await c.env.NEXT_INC_CACHE_R2_BUCKET.get('media')
  console.log(media)
    return c.json(
        {
            message: 'getting media',
            status: 'success',
            success: true,
        },
    )
}
export const uploadMediaHandler: RouteHandler<uploadMedia, { Bindings: Bindings }> = async (c) => {
    const formData = await c.req.formData()
    const file = formData.get('file') as any        
    const media = await c.env.NEXT_INC_CACHE_R2_BUCKET.put('media', file)
    console.log(media)
    return c.json({
        message: `wrote ${file} successfully!`,
        status: 'success',
        success: true,
    })
}