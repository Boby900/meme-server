
import health from './routes/health'
import createApp from './lib/create-app'
import { configureOpenApi } from './lib/configure-open-api'
import user from './routes/users/user'
import memes from './routes/memes/memes.index'
import notes from './routes/notes/notes.index'
import media from './routes/media/media.index'
import { basicAuth } from 'hono/basic-auth'
const app = createApp()
configureOpenApi(app)
app.route('/', health)
app.route('/', user)
app.route('/', memes)
// Add basic auth middleware specifically for notes routes
app.use('/kv/*', basicAuth({
    username: 'admin',
    password: 'secret'
}))
app.use('/kv', basicAuth({
    username: 'admin',
    password: 'secret'
}))
app.use('/notes', basicAuth({
    username: 'admin',
    password: 'secret'
}))
app.route('/', notes)
app.route('/', media)

export default app
