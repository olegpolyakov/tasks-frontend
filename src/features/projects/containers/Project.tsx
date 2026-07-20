import { TaskProvider, TaskView } from '@/features/tasks';

import { ProjectView } from '../components';
import { ProjectProvider } from '../providers';

export default function Project() {
    return (
        <ProjectProvider>
            <TaskProvider>
                <ProjectView>
                    <TaskView />
                </ProjectView>
            </TaskProvider>
        </ProjectProvider>
    );
}
