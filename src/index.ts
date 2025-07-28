
import health from './routes/health'
import createApp from './lib/create-app'
import { configureOpenApi } from './lib/configure-open-api'
import user from './routes/user'

const app = createApp()
configureOpenApi(app)
app.route('/', health)
app.route('/',user)


export default app
