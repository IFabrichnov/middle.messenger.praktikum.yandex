import { resolve } from 'path';
import { defineConfig } from 'vite';
import Handlebars from 'handlebars';

function handlebarsTemplate(src: string) {
  return `
    import Handlebars from 'handlebars/runtime';
    export default Handlebars.template(${Handlebars.precompile(src)});
  `;
}

export default defineConfig({
  publicDir: resolve(__dirname, 'public'),
  plugins: [
    {
      name: 'vite-plugin-handlebars-precompile',
      transform(src, id) {
        if (!id.endsWith('.hbs')) return;

        return {
          code: handlebarsTemplate(src),
          map: null,
        };
      },
    },
  ],
  root: resolve(__dirname, 'src'),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
  },
});
