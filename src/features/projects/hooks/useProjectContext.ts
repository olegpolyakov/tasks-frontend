import { useContext } from 'react';

import { ProjectContext } from '../contexts';

export default function useProjectContext() {
    const context = useContext(ProjectContext);
    
    if (!context) {
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    
    return context;
}