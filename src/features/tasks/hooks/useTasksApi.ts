import { useAuthContext } from '@/features/auth';

import { localApi, remoteApi } from '../api';

export default function useTasksApi() {
    const { userId } = useAuthContext();

    return userId ? remoteApi : localApi;
}