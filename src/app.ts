import { generatePac, initConfig } from './utils';
import { Hono } from 'hono';
import logger from './utils/logger';

initConfig();

const app = new Hono();
app.get('/', (c) => c.text('Hello!'));
app.get('/auto.pac', (c) => c.text(generatePac()));

logger.info(`Server started at http://localhost:3000`);

export default app;
