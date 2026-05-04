import { ReactNode, useMemo } from 'react';

import { TasksContext, TasksContextValue } from '../contexts';
import { useTasks } from '../hooks';

export default function TasksProvider({
    children
}: {
    children: ReactNode | ((value: TasksContextValue) => ReactNode);
}) {
    const {
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    } = useTasks();

    const value = useMemo(() => ({
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    }), [
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    ]);

    return (
        <TasksContext.Provider value={value}>
            {typeof children === 'function'
                ? children(value)
                : children
            }
        </TasksContext.Provider>
    );
}