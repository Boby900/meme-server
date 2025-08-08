
import health from './routes/health'
import createApp from './lib/create-app'
import { configureOpenApi } from './lib/configure-open-api'
import user from './routes/users/users.index'
import memes from './routes/memes/memes.index'
import notes from './routes/notes/notes.index'
import media from './routes/media/media.index'
const app = createApp()
configureOpenApi(app)
app.route('/', health)
app.route('/api/users', user)
app.route('/api/memes', memes)
app.route('/api/notes', notes)
app.route('/api/media', media)

export default app
