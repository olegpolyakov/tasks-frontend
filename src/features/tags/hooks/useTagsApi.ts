import { useAuthContext } from '@/features/auth';

import { remoteApi } from '../api';

export default function useTagsApi() {
    const { userId } = useAuthContext();

    return remoteApi;
}