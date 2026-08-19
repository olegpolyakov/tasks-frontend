import { defineConfig, mergeConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import sharedConfig from '@olegpolyakov/frontend/viteconfig';

export default defineConfig(mergeConfig(
    sharedConfig({
        basePath: import.meta.dirname,
        server: {
            allowedHosts: ['tasks.olegpoliakov.local', 'localhost'],
            host: 'tasks.olegpoliakov.local',
            port: 5173,
            strictPort: true
        }
    }), {
        plugins: [VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Tasks',
                short_name: 'Tasks',
                description: 'Manage your tasks, projects, and tags.',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                scope: '/',
                icons: [{
                    src: '/logo.svg',
                    sizes: 'any',
                    type: 'image/svg+xml',
                    purpose: 'any'
                }]
            }
        })]
    }
));