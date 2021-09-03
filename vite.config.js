import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import graphql from '@rollup/plugin-graphql';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), graphql(), VitePWA()],
    optimizeDeps: {
        exclude: ['@urql/svelte'],
    }
})
