import { defineConfig, mergeConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import sharedConfig from '@olegpolyakov/frontend/viteconfig';

export default defineConfig(env => mergeConfig(
    sharedConfig(env),
    {
        plugins: [
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
                manifest: {
                    name: 'Tasks',
                    short_name: 'Tasks',
                    description: 'Manage your tasks, projects, and tags.',
                    theme_color: '#ffffff',
                    background_color: '#171717',
                    display: 'standalone',
                    start_url: '/',
                    scope: '/',
                    icons: [
                        {
                            src: '/pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: '/pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        },
                        {
                            src: '/pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any'
                        },
                        {
                            src: '/pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'maskable'
                        }
                    ]
                }
            })
        ]
    }
));