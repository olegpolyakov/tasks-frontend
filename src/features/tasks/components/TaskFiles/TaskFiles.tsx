import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { EntityRef } from '@olegpolyakov/core';
import type { Task } from '@olegpolyakov/tasks-core';
import {  Field, Flex, Item, Text } from '@olegpolyakov/ui';
import ConfirmButton from '@olegpolyakov/frontend/components/ConfirmButton';
import EntityRefs from '@olegpolyakov/frontend/components/EntityRefs';
import { Upload, useUploadContext } from '@olegpolyakov/frontend/features/upload';

import { FILES_API_URL } from '@/env';

import styles from './TaskFiles.module.scss';

type FileData = {
    id: string;
    name: string;
    path: string;
    type: string;
    size: number;
};

export default function TaskFiles({
    task,
    onChange
}:{
    task: Task,
    onChange: (refs: EntityRef[]) => void
}) {
    const { upload } = useUploadContext();
    const { t } = useTranslation(); 

    const handleUpload = useCallback(async (file: File) => {
        const uploadedFile = await upload<FileData>(file);

        if (task.refs.find(ref => ref.id === uploadedFile.id)) {
            return;
        }

        onChange([...task.refs, { id: uploadedFile.id, type: 'file', uri: uploadedFile.path }]);
    }, [task.refs, upload, onChange]);

    const handleDelete = useCallback((entity: FileData) => {
        onChange(task.refs.filter(ref => ref.id !== entity.id));
    }, [task.refs, onChange]);

    const fileRefs = useMemo(() => task.refs.filter(ref => ref.type === 'file'), [task.refs]);

    return (
        <Field
            label={t('files')}
            className={styles.root}
        >
            <EntityRefs<FileData>
                baseUrl={FILES_API_URL}
                refs={fileRefs}
                renderEntity={entity => 
                    <Item
                        key={entity.id}
                        content={
                            <Flex column>
                                <Text content={entity.name} />

                                <Text
                                    content={entity.size.toString()}
                                    color="secondary"
                                    size="s"
                                />
                            </Flex>
                        }
                        end={
                            <ConfirmButton
                                onConfirm={() => handleDelete(entity)}
                            />
                        }
                        shape="rounded-s"
                        variant="outlined-tinted"
                    />
                }
            />

            <Upload
                onUpload={handleUpload}
                compact
            />
        </Field>
    );
}