import settings from '@olegpolyakov/frontend/features/settings';
import type { Settings } from '@olegpolyakov/tasks/core';

export const {
    fetchSettings,
    updateSettings,
    useSettings,
    useSettingsContext,
    SettingsProvider
} = settings<Settings>(import.meta.env.VITE_API_URL);