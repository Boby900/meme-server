
import health from './routes/health'
import createApp from './lib/create-app'
import { configureOpenApi } from './lib/configure-open-api'
import user from './routes/users/user'
import memes from './routes/memes/memes.index'

const app = createApp()
configureOpenApi(app)
app.route('/', health)
app.route('/',user)
app.route('/',memes)


export default app
