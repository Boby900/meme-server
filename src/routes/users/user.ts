import { getUser } from '../../controllers/users/user'
import  createApp  from '../../lib/create-app'

const router = createApp()
router.get('/get-user', getUser)

export default router
