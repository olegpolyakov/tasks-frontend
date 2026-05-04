import { TaskProvider } from '../providers';
import { TaskView } from '../views';

export default function Task() {
    return (
        <TaskProvider>
            <TaskView />
        </TaskProvider>
    );
}