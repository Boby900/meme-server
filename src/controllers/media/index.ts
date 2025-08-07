import { RouteHandler } from "@hono/zod-openapi"
import type { Bindings } from "../../types"
import { getMedia, uploadMedia } from "@/routes/media/media.routes"
export const getMediaHandler: RouteHandler<getMedia, { Bindings: Bindings }> = async (c) => {
    try {
        const media = await c.env.NEXT_INC_CACHE_R2_BUCKET.get('media')

        if (!media) {
            return c.json({
                message: 'Media not found',
                status: 'error',
                success: false,
            })
        }


        return c.json({
            message: 'Media retrieved successfully',
            status: 'success',
            success: true,
        }, 200)
    } catch (error) {
        return c.json({
            message: 'Failed to retrieve media',
            status: 'error',
            success: false,
        }, 500)
    }
}
export const uploadMediaHandler: RouteHandler<uploadMedia, { Bindings: Bindings }> = async (c) => {
   
    try {
        const formData = await c.req.formData()
        const file = formData.get('file') as any
        const media = await c.env.NEXT_INC_CACHE_R2_BUCKET.put('media', file)
    
        return c.json({
            message: `wrote ${file} to bucket ${media} successfully!`,
            status: 'success',
            success: true,
        },200)
    } catch (error) {
        return c.json({
            message: 'Failed to upload media',
            status: 'error',
            success: false,
        }, 500)
    }
}