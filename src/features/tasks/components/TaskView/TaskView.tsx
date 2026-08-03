import { Button, ButtonGroup, Checkbox, Drawer } from '@olegpolyakov/ui';
import Editable from '@olegpolyakov/frontend/components/Editable';
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
            title={task && {
                start: (
                    <Checkbox
                        checked={task.completed}
                        onChange={({ checked }) => updateTask({ completed: checked })}
                    />
                ),
                content: (
                    <Editable
                        content={task.title}
                        onBlur={title => updateTask({ title })}
                    />
                ),
                size: 's'
            }}
            closeOnClickOutside={isMobile}
            onClose={unsetTask}
        >
            {task &&
                <TaskDetails
                    key={task.id}
                    task={task}
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
            </ButtonGroup>
        </Drawer>
    );
}