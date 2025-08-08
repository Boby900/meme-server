import  createApp  from '../../lib/create-app'
import {  createUserRoute, deleteUserRoute, readUserRoute  } from '@/routes/users/users.routes'
import { createUserHandler, deleteUserHandler, readUserHandler } from '@/controllers/users/user'
const router = createApp()
    .openapi(createUserRoute, createUserHandler)
    .openapi(readUserRoute, readUserHandler)
    .openapi(deleteUserRoute, deleteUserHandler)


export default router       