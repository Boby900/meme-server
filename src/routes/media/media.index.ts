import  createApp  from '../../lib/create-app'

import { getMedia, uploadMedia } from './media.routes'
import { getMediaHandler, uploadMediaHandler } from '@/controllers/media'
const router = createApp()
    .openapi(getMedia, getMediaHandler)
    .openapi(uploadMedia, uploadMediaHandler)

export default router
