await Bun.build({
  entrypoints: ['./src/platform/index.ts', './src/platform/lambda.ts'],
  outdir: './dist',
  target: 'node',
  external: ['log4js', 'hono'],
});
