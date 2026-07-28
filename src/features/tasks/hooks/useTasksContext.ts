import { useContext } from 'react';

import { TasksContext } from '../contexts';

export default function useTasksContext() {
    const context = useContext(TasksContext);
    
    if (!context) {
        throw new Error('useTasksContext must be used within a TasksProvider');
    }
    
    return context;
}