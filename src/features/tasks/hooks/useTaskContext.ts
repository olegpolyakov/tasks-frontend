import { useContext } from 'react';

import { TaskContext } from '../contexts';

export default function useTaskContext() {
    const context = useContext(TaskContext);
    
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    
    return context;
}