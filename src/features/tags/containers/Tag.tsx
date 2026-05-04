import { useParams } from 'react-router-dom';

import { TaskProvider, TasksView } from '@/features/tasks';
import EntityIcon from '@/shared/components/EntityIcon';

import { TagDeleteAction, TagEditAction } from '../components';
import { TagProvider } from '../providers';

export default function Tag() {
    const { tagId = '' } = useParams();
    
    return (
        <TagProvider tagId={tagId}>
            {({ tag }) => (
                <TaskProvider>
                    <TasksView
                        id={tagId}
                        heading={{
                            start: <EntityIcon icon={tag.icon || 'tag'} />,
                            content: tag.name
                        }}
                        actions={<>
                            <TagEditAction
                                tagId={tag.id}
                                icon="edit"
                            />

                            <TagDeleteAction
                                tagId={tag.id}
                                icon="delete"
                            />
                        </>}
                    />
                </TaskProvider>
            )}
        </TagProvider>
    );
}