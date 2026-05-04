import { atom } from 'jotai';

import type { Settings } from '@olegpolyakov/tasks/core';

export const settingsAtom = atom<Settings | null>(null);