import { useAuthContext } from '@/features/auth';

import { remoteApi } from '../api';

export default function useProjectsApi() {
    const { userId } = useAuthContext();

    return remoteApi;
}