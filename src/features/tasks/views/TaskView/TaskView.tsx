import { Button, ButtonGroup, Drawer } from 'kantanui';

import { TaskDetails } from '../../components';
import { useTaskContext } from '../../contexts';

import styles from './TaskView.module.scss';

export default function TaskView() {
    const { task, unsetTask, updateTask, deleteTask } = useTaskContext();

    if (!task) {
        return null;
    }

    return (
        <Drawer
            className={styles.root}
            open={!!task}
            type="inline"
            position="right"
            size="m"
            onClose={unsetTask}
        >
            <TaskDetails
                key={task?.id}
                task={task!}
                onUpdate={(id, data) => updateTask(data)}
            />

            <ButtonGroup>
                <Button 
                    icon="delete"
                    content="Delete"
                    color="danger"
                    variant="tinted"
                    fluid
                    onClick={() => {
                        if (confirm('Are you sure you want to delete this task?')) {
                            deleteTask();
                        }
                    }}
                />

                <Button 
                    icon="right_panel_close"
                    variant="tinted"
                    onClick={unsetTask}
                />
            </ButtonGroup>
        </Drawer>
    );
}