import { type ReactNode, useMemo } from 'react';

import { TaskContext, TaskContextValue } from '../contexts';
import { useTask } from '../hooks';

export default function TaskProvider({
    children
}: {
    children: ReactNode | ((value: TaskContextValue) => ReactNode);
}) {
    const {
        task,
        setTask,
        unsetTask,
        updateTask,
        toggleTask,
        deleteTask
    } = useTask();

    const value = useMemo(() => ({
        task: task!,
        setTask,
        unsetTask,
        updateTask,
        toggleTask,
        deleteTask
    }), [
        task,
        setTask,
        unsetTask,
        updateTask,
        toggleTask,
        deleteTask
    ]);

    return (
        <TaskContext.Provider value={value}>
            {typeof children === 'function'
                ? children(value)
                : children
            }
        </TaskContext.Provider>
    );
}