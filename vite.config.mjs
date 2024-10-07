import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'public'),
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
    })],
    server: {
        port: 3000,
    },
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/pages/login.html'),
                register: resolve(__dirname, 'src/pages/register.html'),
            },
        },
    }
});
