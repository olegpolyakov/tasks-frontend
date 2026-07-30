import { defineConfig } from 'vite';

import sharedConfig from '@olegpolyakov/frontend/viteconfig';

export default defineConfig(sharedConfig({
    basePath: import.meta.dirname,
    server: {
        allowedHosts: ['tasks.olegpoliakov.local', 'localhost'],
        host: 'tasks.olegpoliakov.local',
        port: 5173,
        strictPort: true
    }
}));