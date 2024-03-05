import { generatePac, initConfig } from './utils';
import { Hono } from 'hono';

initConfig();

const app = new Hono();
app.get('/', (c) => c.text('Hello!'));
app.get('/auto.pac', (c) => c.text(generatePac()));

export default app;
