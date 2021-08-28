const { build } = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');

const isDev = process.env.NODE_ENV !== 'production';

(async () => {
  build({
    entryPoints: ['src/index.tsx'],
    outdir: 'dist',
    bundle: true,
    minify: true,
    sourcemap: isDev,
    watch: isDev,
    platform: 'node',
    plugins: [sassPlugin()],
    external: ['*.woff'],
  }).catch((e) => console.error(e.message));
})();
