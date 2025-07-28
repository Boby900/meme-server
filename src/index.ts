import { OpenAPIHono } from "@hono/zod-openapi";
import { health } from './routes/health';
import { user } from './routes/user';

const app = new OpenAPIHono();

//Base route
app.get('/', (c) => {
  return c.text('hello world');
});

app.route('/health', health);
app.route('/users', user);

export default app;
