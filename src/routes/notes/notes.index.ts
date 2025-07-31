import  createApp  from '../../lib/create-app'
import * as notesRoutes from './notes.routes'
import * as notesHandler from '@/controllers/notes/notes'
import * as writeNotesToKV from '@/controllers/notes/notes'
import * as readNotesFromKV from '@/controllers/notes/notes'
import * as deleteNotesFromKV from '@/controllers/notes/notes'
const router = createApp()
    .openapi(notesRoutes.notes, notesHandler.notesHandler)
    .openapi(notesRoutes.notesPost, notesHandler.notesPostHandler)
    .openapi(notesRoutes.writeKVRoute, writeNotesToKV.writeNotesToKV)
    .openapi(notesRoutes.readKVRoute, readNotesFromKV.readNotesFromKV)
    .openapi(notesRoutes.deleteKVRoute, deleteNotesFromKV.deleteNotesFromKV)


export default router   