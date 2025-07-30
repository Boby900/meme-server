import  createApp  from '../../lib/create-app'
import * as notesRoutes from './notes.routes'
import * as notesHandler from '@/controllers/notes/notes'
import * as writeNotesToKV from '@/controllers/notes/notes'
import * as readNotesFromKV from '@/controllers/notes/notes'
import * as deleteNotesFromKV from '@/controllers/notes/notes'
const router = createApp()
router.openapi(notesRoutes.notes, notesHandler.notesHandler)
router.openapi(notesRoutes.notesPost, notesHandler.notesPostHandler)
router.openapi(notesRoutes.writeKVRoute, writeNotesToKV.writeNotesToKV)
router.openapi(notesRoutes.readKVRoute, readNotesFromKV.readNotesFromKV)
router.openapi(notesRoutes.deleteKVRoute, deleteNotesFromKV.deleteNotesFromKV)


export default router   