import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import graphql from '@rollup/plugin-graphql';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), graphql()],
    optimizeDeps: {
        exclude: ['@urql/svelte'],
    }
})
