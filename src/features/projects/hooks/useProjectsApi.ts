import { useApi } from '@/features/api';

import { remoteApi } from '../api';

export default function useProjectsApi() {
    return useApi(remoteApi);
}