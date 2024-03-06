// Purpose: Build the platform code using Bun.
await Bun.build({
	entrypoints: ['./src/platform/index.ts'],
	outdir: './dist',
	target: 'bun',
	external: ['log4js', 'hono'],
});
