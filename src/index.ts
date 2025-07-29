
import health from './routes/health'
import createApp from './lib/create-app'
import { configureOpenApi } from './lib/configure-open-api'
import user from './routes/users/user'
import memes from './routes/memes/memes.index'
import notes from './routes/notes/notes.index'
const app = createApp()
configureOpenApi(app)
app.route('/', health)
app.route('/',user)
app.route('/',memes)
app.route('/',notes)

export default app
