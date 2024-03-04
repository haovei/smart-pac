import { generatePac, initConfig } from './utils';

initConfig();

const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/') {
      return new Response('Hello');
    }
    if (url.pathname === '/auto.pac') {
      return new Response(generatePac());
    }
    return new Response('404!');
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
