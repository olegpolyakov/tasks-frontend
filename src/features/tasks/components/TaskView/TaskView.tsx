import { Button, ButtonGroup, Drawer } from '@olegpolyakov/ui';
import { useIsMobile } from '@olegpolyakov/frontend/hooks/mq';

import { TaskDetails } from '../../components';
import { useTaskContext } from '../../hooks';

import styles from './TaskView.module.scss';

export default function TaskView() {
    const { task, unsetTask, updateTask, deleteTask } = useTaskContext();
    const isMobile = useIsMobile();

    return (
        <Drawer
            className={styles.root}
            open={!!task}
            type={isMobile ? 'modal' : 'inline'}
            position={isMobile ? 'bottom' : 'right'}
            size="m"
            closeButton={{ icon: 'close' }}
            closeOnClickOutside={isMobile}
            onClose={unsetTask}
        >
            {task &&
                <TaskDetails
                    key={task?.id}
                    task={task!}
                    onUpdate={(id, data) => updateTask(data)}
                />
            }

            <ButtonGroup>
                <Button 
                    icon="delete"
                    content="Delete"
                    color="danger"
                    variant="tinted"
                    fluid
                    onClick={deleteTask}
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