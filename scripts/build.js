await Bun.build({
  entrypoints: ['./src/platform/index.ts'],
  outdir: './dist',
  target: 'node',
  external: ['log4js', 'hono'],
});
