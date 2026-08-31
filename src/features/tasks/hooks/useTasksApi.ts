import { useApi } from '@/features/api';
import { useAuthContext } from '@/features/auth';

import { localApi, remoteApi } from '../api';

export default function useTasksApi() {
    const { isAuthenticated } = useAuthContext();
    
    return useApi(isAuthenticated ? remoteApi : localApi);
}