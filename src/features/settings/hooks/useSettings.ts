import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import type { Settings } from '@olegpolyakov/tasks/core';

import * as api from '../api';
import { settingsAtom } from '../atoms';

export default function useSettings() {
    const [settings, setSettings] = useAtom(settingsAtom);

    useEffect(() => {
        api.fetchSettings().then(setSettings);
    }, [setSettings]);

    const settingsId = settings?.id;
    
    const updateSettings = useCallback(async (data: Partial<Settings>) => {
        if (!settingsId) {
            return;
        }

        const updatedSettings = await api.updateSettings(data);

        setSettings(prevSettings => ({
            ...prevSettings,
            ...updatedSettings
        }));
    }, [settingsId, setSettings]);

    return {
        settings,
        updateSettings
    };
}