import  createApp  from '../../lib/create-app'
import * as mediaRoutes from './media.routes'
import * as mediaHandler from '@/controllers/media/index'
const router = createApp()
    .openapi(mediaRoutes.getMedia, mediaHandler.getMediaHandler)
    .openapi(mediaRoutes.uploadMedia, mediaHandler.uploadMediaHandler)

export default router
