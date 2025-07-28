import  createApp  from '../../lib/create-app'
import * as memesRoutes from './memes.routes'
import * as memesHandler from './memes.handlers'
const router = createApp()
router.openapi(memesRoutes.memes, memesHandler.memesHandler)

export default router
