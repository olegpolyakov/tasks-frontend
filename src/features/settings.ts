import type { TasksSettings } from '@olegpolyakov/tasks-core';
import settings from '@olegpolyakov/frontend/features/settings';

export const {
    fetchSettings,
    updateSettings,
    useSettings,
    useSettingsContext,
    SettingsProvider
} = settings<TasksSettings>(import.meta.env.VITE_API_URL);