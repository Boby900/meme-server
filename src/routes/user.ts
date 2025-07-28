import { getUser } from '../controllers/user'
import  createApp  from '../lib/create-app'

const router = createApp()
router.get('/getUser', getUser)

export default router
