import { v4 as uuid } from 'uuid';

import { Task, type TaskData } from '@olegpolyakov/tasks-core';

import type { TasksApi } from './interface';

const tasks = new Map<string, TaskData>();
const events = new EventTarget();

export default (): TasksApi => ({
    events,

    async fetchTasks(): Promise<TaskData[]> {
        return Array.from(tasks.values());
    },

    async createTask(data: Partial<TaskData>): Promise<TaskData> {
        const id = uuid();
        const task = new Task({ id, ...data }).toData();

        tasks.set(id, task);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Task',
                action: 'insert',
                documentId: id,
                data: task
            })
        }));
        
        return task;
    },

    async updateTask(id: string, data: Partial<TaskData>): Promise<TaskData> {
        const task = tasks.get(id);

        if (!task) throw new Error('Task not found');

        const updatedTask = { ...task, ...data };

        tasks.set(id, updatedTask);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Task',
                action: 'update',
                documentId: id,
                data: updatedTask
            })
        }));

        return updatedTask;
    },

    async toggleTask(id: string, completed: boolean): Promise<TaskData> {
        const task = tasks.get(id);

        if (!task) throw new Error('Task not found');

        const updatedTask = { ...task, completed };
        
        tasks.set(id, updatedTask);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Task',
                action: 'update',
                documentId: id,
                data: updatedTask
            })
        }));

        if (completed && task.recurrence) {
            await this.createTask({
                ...task,
                completed: false,
                date: new Task(task).getNextDate()
            });
        }

        return updatedTask;
    },

    async deleteTask(id: string): Promise<void> {
        tasks.delete(id);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Task',
                action: 'delete',
                documentId: id,
                data: null
            })
        }));

        return;
    }
});