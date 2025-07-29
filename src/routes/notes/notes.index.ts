import  createApp  from '../../lib/create-app'
import * as notesRoutes from './notes.routes'
import * as notesHandler from '@/controllers/notes/notes'
const router = createApp()
router.openapi(notesRoutes.notes, notesHandler.notesHandler)
router.openapi(notesRoutes.notesPost, notesHandler.notesPostHandler)

export default router   