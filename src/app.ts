import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/bun';
import { etag } from 'hono/etag';
import { generatePac, initConfig } from './utils';
import logger from './utils/logger';
import { listHosts, listRules, addOrUpdateHost, delHost, addOrUpdateRule, delRule } from './api';
import { ACCESS_TOKEN, PORT } from './const';

initConfig();

const app = new Hono();

app.use(async (c, next) => {
    logger.info(`${c.req.method} ${c.req.path}`);
    await next();
});

app.use('/*', etag({ weak: true }), serveStatic({ root: './public/' }));

app.get('/auto.pac', (c) => {
    c.header('Content-Type', 'application/x-ns-proxy-autoconfig');
    return c.body(generatePac());
});

app.use('/api/*', cors());

if (ACCESS_TOKEN) {
    app.use('/api/*', bearerAuth({ token: ACCESS_TOKEN }));
}

app.get('/api/hostList', (c) => c.json(listHosts()));
app.post('/api/updateHost', async (c) => {
    const body = await c.req.json();
    addOrUpdateHost(body);
    return c.json({ success: true });
});
app.post('/api/deleteHost', async (c) => {
    const body = await c.req.json();
    delHost(body.id);
    return c.json({ success: true });
});

app.get('/api/ruleList', (c) => c.json(listRules()));
app.post('/api/updateRule', async (c) => {
    const body = await c.req.json();
    addOrUpdateRule(body);
    return c.json({ success: true });
});
app.post('/api/deleteRule', async (c) => {
    const body = await c.req.json();
    delRule(body.rule);
    return c.json({ success: true });
});

logger.info(`Server started at http://localhost:${PORT}`);

export default {
    port: PORT,
    fetch: app.fetch,
};
