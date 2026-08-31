import { useApi } from '@/features/api';

import { remoteApi } from '../api';

export default function useTagsApi() {
    return useApi(remoteApi);
}