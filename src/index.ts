import { Hono } from 'hono';
import { health } from './routes/health';
import { user } from './routes/user';

const app = new Hono();

//Base route
app.get('/', (c) => {
  return c.json({
    name: 'Meme Server API',
    version: '1.0.0',
    documentation: '/docs', // Consider adding API documentation
  });
});


app.route('/health', health);
app.route('/users', user);

export default app;
