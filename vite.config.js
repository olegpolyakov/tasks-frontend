import { defineConfig } from 'vite';

import sharedConfig from '@olegpolyakov/frontend/viteconfig';

export default defineConfig(sharedConfig({
    basePath: import.meta.dirname,
    server: {
        allowedHosts: ['tasks_frontend', 'tasks.olegpoliakov.local', 'localhost']
    }
}));