import { useEffect, useState } from 'react';

import { Button, ButtonGroup, Drawer } from 'kantanui';

import { useIsMobile } from '@olegpolyakov/frontend/hooks/mq';

import { TaskDetails } from '../../components';
import { useTaskContext } from '../../contexts';

import styles from './TaskView.module.scss';

export default function TaskView() {
    const { task, unsetTask, updateTask, deleteTask } = useTaskContext();
    const isMobile = useIsMobile();
    
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(!!task);
    }, [task]);

    return (
        <Drawer
            className={styles.root}
            open={isOpen}
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