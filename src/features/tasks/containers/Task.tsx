import { TaskView } from '../components';
import { TaskProvider } from '../providers';

export default function Task() {
    return (
        <TaskProvider>
            <TaskView />
        </TaskProvider>
    );
}