import { useEffect } from 'react';

import { atom, useAtom } from 'jotai';

import type { TaskData } from '@olegpolyakov/tasks-core';

import { socket } from '@/ws';

export const tasksAtom = atom<TaskData[]>([]);

export function useTasksState() {
    const [tasks, setTasks] = useAtom(tasksAtom);

    useEffect(() => {
        socket.onmessage = event => {
            const { action, data, documentId } = JSON.parse(event.data);

            switch (action) {
                case 'insert':
                    return setTasks(tasks => tasks.concat(data));
                case 'update':
                    return setTasks(tasks => tasks.map(t => t.id !== data.id ? t : { ...t, ...data }));
                case 'delete':
                    return setTasks(tasks => tasks.filter(t => t.id !== documentId));
            }
        };
    }, [setTasks]);

    return [tasks, setTasks];
}

export const taskAtom = atom<TaskData | null>(null);

export function useTaskState() {
    const [task, setTask] =  useAtom(taskAtom);

    useEffect(() => {
        socket.onmessage = event => {
            const { action, data, documentId } = JSON.parse(event.data);
            
            switch (action) {
                case 'update':
                    return setTask(task => 
                        task && task.id === data.id
                            ? ({ ...task, ...data })
                            : task
                    );
                case 'delete':
                    return setTask(task =>
                        task && task.id === documentId
                            ? null
                            : task
                    );
            }
        };
    }, [setTask]);

    return [task, setTask];
}